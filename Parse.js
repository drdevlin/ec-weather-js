/**
 * A collection of methods for parsing the raw XML weather data from Environment Canada.
 * This is a private module, meant only to be used internally by the Weather module.
 * @module
 */

const { xml2js } = require('xml-js');

/**
 * @classdesc
 * An object that converts, normalizes, simplifies, or restructures the data contained within it.
 * An explanation of these methods is provided below.
 * The methods return a new Parse instance to enable chaining.
 */
class Parse {

  /**
   * @constructor
   * Stores the data given to it.
   * @param {(string|<Parse>)} data Either the raw XML weather data or the result of a previous method.
   */
  constructor(data) {
    this.data = data;
  }

  /**
   * Converts raw XML weather data to a javascript object and removes some useless properties.
   * The internal 'data' property should be a string.
   * @returns {<Parse>}
   */
  convert() {
    const converted = xml2js(this.data, { compact: true });

    if (!converted.hasOwnProperty('siteData')) throw new TypeError("Input doesn't seem to be weather data.");

    const mainData = converted.siteData;
    delete mainData.license;
    delete mainData.dateTime;
    delete mainData._attributes;

    return new Parse(mainData);
  }

  /**
   * Removes some of the quirks of the xml2js conversion.
   * Recurses through the object, flattening '_attributes' to its parent object and renaming '_text' to 'value'.
   * The internal 'data' property must be the result of convert().
   * @returns {<Parse>}
   */
  normalize() {
    const recurse = (data) => {
      if (!Array.isArray(data)) {
        // base case
        const copy = { ...data };
        let attributesAndValue = {};
        if (copy.hasOwnProperty('_attributes')) {
          attributesAndValue = { ...copy._attributes };
          delete copy._attributes;
        }
        if (copy.hasOwnProperty('_text')) {
          attributesAndValue.value = copy._text;
          delete copy._text;
        }
        // recurse over other objects, including arrays
        for (const prop in copy) {
          if (typeof copy[prop] === 'object') copy[prop] = recurse(copy[prop]);
        }
        return { ...attributesAndValue, ...copy };
      } else {
        // recurse over objects in array
        return data.map(el => recurse(el));
      }
    }
    const result = recurse(this.data);
    return new Parse(result);
  }

  /**
   * Removes some extraneous objects.
   * Recurses through the object, flattening any object whose sole property is 'value' and 
   * changing empty objects to null values.
   * The internal 'data' property must be the result of normalize().
   * @returns {<Parse>}
   */
  simplify() {
    const recurse = (data) => {
      if (!Array.isArray(data)) {
        // base case
        const copy = { ...data };
        const props = Object.entries(copy).map(el => el[0]);
        if (props.length === 0) {
          return null;
        } else if (props.length === 1 && copy.hasOwnProperty('value')) {
          return copy.value;
        } else {
          // recurse over other objects, including arrays
          for (const prop in copy) {
            if (typeof copy[prop] === 'object') copy[prop] = recurse(copy[prop]);
          }
          return copy;
        }
      } else {
        // recurse over objects in array
        return data.map(el => recurse(el));
      }
    }
    const result = recurse(this.data);
    return new Parse(result);
  }

  /**
   * Builds a Map object of the forecast data.
   * The weekly forecast and hourly forecast are restructured into a single Map object called 'forecast',
   * which is placed at the root. This makes the forecast data accessible in the following way:
   * the forecast for a day is accessed by the name of the day of the week;
   * the forecast for an hour is accessed by a UTC timestamp.
   * The old structure is deleted, and 'regionalNormals' is moved to the root.
   * The internal 'data' property must be the result of simplify().
   * @returns {<Parse>}
   */
  restructure() {
    const result = { ...this.data };
    const forecast = new Map();
    result.forecastGroup.forecast.forEach(el => {
      const copy = { ...el };
      delete copy.period;
      forecast.set(el.period.value.toLowerCase(), copy);
    });
    result.regionalNormals = result.forecastGroup.regionalNormals;
    delete result.forecastGroup;
    result.hourlyForecastGroup.hourlyForecast.forEach(el => {
      const copy = { ...el };
      delete copy.dateTimeUTC;
      forecast.set(el.dateTimeUTC, copy);
    });
    delete result.hourlyForecastGroup;
    result.forecast = forecast;
    return new Parse(result);
  }
}

module.exports = Parse;