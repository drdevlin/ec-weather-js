class Weather {
  constructor(fetchedXMLWeatherData) {
    if (typeof fetchedXMLWeatherData !== 'string') throw new TypeError('Argument must be a string.');
    
    this._originalXML = fetchedXMLWeatherData;
  }
}

module.exports = Weather;