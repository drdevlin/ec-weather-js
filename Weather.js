const Parse = require("./Parse");

class Weather {
  constructor(fetchedXMLWeatherData) {
    if (typeof fetchedXMLWeatherData !== 'string') throw new TypeError('Argument must be a string.');

    this._originalXML = fetchedXMLWeatherData;
    this._data = new Parse(this._originalXML).convert().normalize().simplify().restructure().data;
  }

  get all() {
    return this._data;
  }

  get raw() {
    return this._originalXML;
  }
}

module.exports = Weather;