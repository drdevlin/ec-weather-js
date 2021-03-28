const { xml2js } = require('xml-js');

class Weather {
  constructor(fetchedXMLWeatherData) {
    if (typeof fetchedXMLWeatherData !== 'string') throw new TypeError('Argument must be a string.');

    this._originalXML = fetchedXMLWeatherData;
    const converted = this._convert(this._originalXML);
    const normalized = this._normalize(converted);
    this._data = this._simplify(normalized);
  }
  
  // private
  _convert(originalXML) {
    const converted = xml2js(originalXML, { compact: true });

    const mainData = converted.siteData;

    return mainData;
  }

  _normalize(convertedObject) {
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
        if (typeof copy[prop] === 'object') copy[prop] = this._normalize(copy[prop]);
      }
      return { ...attributesAndValue, ...copy };
    } else {
      // recurse over objects in array
      return convertedObject.map(el => this._normalize(el));
    }
  }

  _simplify(normalizedObject) {
    if (!Array.isArray(normalizedObject)) {
      // base case
      const copy = { ...normalizedObject };
      const props = Object.entries(copy).map(el => el[0]);
      if (props.length === 0) {
        return null;
      } else if (props.length === 1 && copy.hasOwnProperty('value')) {
        return copy.value;
      } else {
        // recurse over other objects, including arrays
        for (const prop in copy) {
          if (typeof copy[prop] === 'object') copy[prop] = this._simplify(copy[prop]);
        }
        return copy;
      }
    } else {
      // recurse over objects in array
      return normalizedObject.map(el => this._simplify(el));
    }
  }
}

module.exports = Weather;