const { xml2js } = require('xml-js');

class Weather {
  constructor(fetchedXMLWeatherData) {
    if (typeof fetchedXMLWeatherData !== 'string') throw new TypeError('Argument must be a string.');

    this._originalXML = fetchedXMLWeatherData;
    this._data = xml2js(fetchedXMLWeatherData);
  }
}

module.exports = Weather;