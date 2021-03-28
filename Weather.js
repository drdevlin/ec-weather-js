const { xml2js } = require('xml-js');

class Weather {
  constructor(fetchedXMLWeatherData) {
    if (typeof fetchedXMLWeatherData !== 'string') throw new TypeError('Argument must be a string.');

    this._originalXML = fetchedXMLWeatherData;
    const converted = this._convert(this._originalXML);
    this._data = this._simplify(converted);
  }
  
  // private
  _convert(originalXML) {
    const converted = xml2js(originalXML, { compact: true });

    const mainData = converted.siteData;

    return mainData;
  }

  _simplify(convertedObject) {
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
        if (typeof copy[prop] === 'object') copy[prop] = this._simplify(copy[prop]);
      }
      return { ...attributesAndValue, ...copy };
    } else {
      // recurse over objects in array
      return convertedObject.map(el => this._simplify(el));
    }
  }
}

module.exports = Weather;