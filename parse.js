/**
 * A collection of methods for parsing the raw XML weather data from Environment Canada.
 * This is a private module, meant only to be used internally by the Weather module.
 * @module
 */

const { xml2js } = require('xml-js');

/**
   * Converts raw XML weather data to a javascript object and removes some useless properties.
   * The internal 'data' property should be a string.
   * @param {string} xml the raw XML weather data from Environment Canada
   */
exports.convert = (xml) => {
  const converted = xml2js(xml, { compact: true });

  if (!('siteData' in converted)) throw new TypeError("Input doesn't seem to be weather data.");

  const { siteData } = converted;
  return [
    { ...siteData },
    Object.entries,
    (entries) => entries.filter(([key]) => key !== 'license'),
    (entries) => entries.filter(([key]) => key !== 'dateTime'),
    (entries) => entries.filter(([key]) => key !== '_attributes'),
    Object.fromEntries
  ].reduce((previousResult, currentFunction) => currentFunction(previousResult));
};

/**
   * Removes some of the quirks of the xml2js conversion.
   * Recurses through the object, flattening '_attributes' to its parent object and renaming '_text' to 'value'.
   * @param {object} siteData the return value of `convert()`
   */
exports.normalize = (siteData) => {
  const recurse = (data) => !Array.isArray(data)
    ? [
      { ...data },

      // base case
      (dataClone) => '_attributes' in dataClone
        ? { ...dataClone, ...dataClone._attributes }
        : { ...dataClone },
      Object.entries,
      (entries) => entries.filter(([key]) => key !== '_attributes'),
      Object.fromEntries,
      (rootedAttributes) => '_text' in rootedAttributes
        ? { ...rootedAttributes, value: rootedAttributes._text }
        : { ...rootedAttributes },
      Object.entries,
      (entries) => entries.filter(([key]) => key !== '_text'),

      // recursion
      (entries) => entries.map(([key, value]) => [
        key,
        typeof value === 'object' ? recurse(value) : value
      ]),
      Object.fromEntries
    ].reduce((previousResult, currentFunction) => currentFunction(previousResult))
    : [
      [ ...data ],

      // recurse over objects in array
      (dataClone) => dataClone.map(el => recurse(el))
    ].reduce((previousResult, currentFunction) => currentFunction(previousResult));
  return [
    { ...siteData },
    (siteDataClone) => recurse(siteDataClone)
  ].reduce((previousResult, currentFunction) => currentFunction(previousResult));
};

/**
   * Removes some extraneous objects.
   * Recurses through the object, flattening any object whose sole property is 'value' and 
   * changing empty objects to null values.
   * @param {object} normalizedData the return value of `normalized()`
   */
exports.simplify = (normalizedData) => {
  const recurse = (data) => (
    !Array.isArray(data)
      ? [
        { ...data },
        Object.entries,
        // base case
        (entries) => entries.length === 0 ? null : entries,
        (entries) => (
          Array.isArray(entries) && entries.length === 1 && entries[0][0] === 'value'
            ? entries[0][1]
            : entries
        ),
        // recursion
        (entries) => (
          Array.isArray(entries)
            ? entries.map(([key, value]) => [
              key,
              typeof value === 'object' ? recurse(value) : value
            ])
            : entries
        ),
        (entries) => (
          Array.isArray(entries)
            ? Object.fromEntries(entries)
            : entries
        )
      ].reduce((previousResult, currentFunction) => currentFunction(previousResult))
      : [
        [ ...data ],
        // recurse over objects in array
        (dataClone) => dataClone.map(el => recurse(el))
      ].reduce((previousResult, currentFunction) => currentFunction(previousResult))
  );
  return [
    { ...normalizedData },
    (normalizedData) => recurse(normalizedData)
  ].reduce((previousResult, currentFunction) => currentFunction(previousResult));
};

/**
   * Builds a Map object of the forecast data.
   * The weekly forecast and hourly forecast are restructured into a single Map object called 'forecast',
   * which is placed at the root. This makes the forecast data accessible in the following way:
   * the forecast for a day is accessed by the name of the day of the week;
   * the forecast for an hour is accessed by a UTC timestamp.
   * The old structure is deleted, and 'regionalNormals' is moved to the root.
   * @param {object} simplifiedData the return value of `simplify()`
   */
exports.restructure = (simplifiedData) => {
  const result = { ...simplifiedData };
  const forecast = new Map();
  result.forecastGroup?.forecast.forEach(el => {
    const copy = { ...el };
    delete copy.period;
    forecast.set(el.period.value.toLowerCase(), copy);
  });
  result.regionalNormals = result.forecastGroup?.regionalNormals || null;
  delete result.forecastGroup;
  result.hourlyForecastGroup?.hourlyForecast.forEach(el => {
    const copy = { ...el };
    delete copy.dateTimeUTC;
    forecast.set(el.dateTimeUTC, copy);
  });
  delete result.hourlyForecastGroup;
  result.forecast = forecast;
  return result;
};
