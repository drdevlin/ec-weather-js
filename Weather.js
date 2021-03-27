const { xml2js } = require('xml-js');

class Weather {
  constructor(fetchedXMLWeatherData) {
    if (typeof fetchedXMLWeatherData !== 'string') throw new TypeError('Argument must be a string.');

    this._originalXML = fetchedXMLWeatherData;
    this._data = xml2js(fetchedXMLWeatherData);
  }

  _convert(originalXML) {
    const converted = xml2js(originalXML, { compact: true });

    const mainData = converted.siteData;

    return this._organize(mainData);
  }

  _organize(convertedObject) {
    if (!Array.isArray(convertedObject)) {
      // base case
      const copy = { ...convertedObject };
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
        if (typeof copy[prop] === 'object') copy[prop] = this._organize(copy[prop]);
      }
      return { ...attributesAndValue, ...copy };
    } else {
      // recurse over objects in array
      return convertedObject.map(el => this._organize(el));
    }
  }
}

module.exports = Weather;