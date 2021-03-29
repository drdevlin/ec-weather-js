/**
 * A javascript API for Environment Canada's weather data.
 * @module
 */

const Parse = require("./Parse");

/**
 * @classdesc A Weather instance has a number of methods for extracting specific types of data
 * from the raw XML weather data fetched from Environment Canada.
 * Thus, the XML data must first be fetched and then passed to the constructor.
 */
class Weather {

  /**
   * Parses and stores the XML data for use by the methods.
   * Also, keeps a copy of the original data passed to it.
   * @param {string} fetchedXMLWeatherData Raw XML weather data from Environment Canada.
   */
  constructor(fetchedXMLWeatherData) {
    if (typeof fetchedXMLWeatherData !== 'string') throw new TypeError('Argument must be a string.');

    this._originalXML = fetchedXMLWeatherData;
    this._data = new Parse(this._originalXML).convert().normalize().simplify().restructure().data;
  }

  /**
   * @returns {Object} All weather data restructured into a javascript object.
   */
  get all() {
    return this._data;
  }

  /**
   * @returns {string} Original XML weather data.
   */
  get raw() {
    return this._originalXML;
  }
}

module.exports = Weather;