/**
 * A JavaScript API for Environment Canada's Weather Data
 * @module
 */

const { convert, normalize, simplify, restructure } = require("./parse");
const ForecastArray = require('./ForecastArray');

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
    if (!fetchedXMLWeatherData) throw new TypeError('Constructor must be passed weather data from Environment Canada.');
    if (typeof fetchedXMLWeatherData !== 'string') throw new TypeError('Argument must be a string.');

    this._originalXML = fetchedXMLWeatherData;
    this._data = [
      this._originalXML,
      convert,
      normalize,
      simplify,
      restructure
    ].reduce((previousResult, currentFunction) => currentFunction(previousResult));
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

  /**
   * @returns {Object} All current conditions.
   */
  get current() {
    return this._data?.currentConditions;
  }

  /**
   * @returns {<ForecastArray>} An array of the weekly forecast
   */
  get weekly() {
    if (!this._data?.forecast) return new ForecastArray();

    return Array.from(this._data.forecast).reduce((accumulator, [key, value]) => {
      const isDay = Number.isNaN(Number(key));
      if (isDay) accumulator.push({ day: key, ...value });
      return accumulator;
    }, new ForecastArray());
  }

  /**
   * @returns {<ForecastArray} An array of the hourly forecast
   */
  get hourly() {
    if (!this._data?.forecast) return new ForecastArray();
    
    return Array.from(this._data.forecast).reduce((accumulator, [key, value]) => {
      const isHour = !Number.isNaN(Number(key));
      if (isHour) accumulator.push({ day: key, ...value });
      return accumulator;
    }, new ForecastArray());
  }

  /**
   * @returns {<Date>} The date of the current forecast
   */
  get date() {
    const dateTime = this._data?.currentConditions?.dateTime?.[0] || {};
    return new Date(Date.UTC(
      Number(dateTime.year),
      Number(dateTime.month?.value) - 1,
      Number(dateTime.day?.value),
      Number(dateTime.hour),
      Number(dateTime.minute)
    ));
  }
  
  /**
   * Retrieves all forecast data for a given date.
   * The method accepts the name of a weekday (as a string),
   * a UTC timestamp in the Environment Canada format (as a string),
   * or a Date instance.
   * Passing a UTC Date instance is recommended.
   * The method will return undefined if no forecast is found.
   * @param {string|<Date>} date The date to forecast
   * @returns {Object}
   */
  forecast(date) {
    const isStringType = typeof date === 'string';
    const isDateType = date instanceof Date;
    if (!isStringType && !isDateType) throw new TypeError('Argument must be a string or Date instance');
    
    const forecastData = this._data.forecast;
    if (isStringType) return forecastData.get(date.toLowerCase());
    
    // isDateType = true
    
    const utcTimestamp = this._makeUTCTimestamp(date);
    if (forecastData.has(utcTimestamp)) return forecastData.get(utcTimestamp);

    // Since the UTC timestamp cannot be found in the forecast data,
    // let's see if we can find the equivalent weekday.
    
    // Is the date within the forecast range?
    const startTime = this.date;
    const endTime = new Date(startTime.getTime() + (1000 * 60 * 60 * 24 * 7));
    const inRange = date.getTime() >= startTime.getTime() && date.getTime() <= endTime.getTime();
    
    if (!inRange) return;
    
    // Determine the local date.
    const UTCOffset = Number(this._data.currentConditions.dateTime[1].UTCOffset);
    const localDateValue = date.getTime() + (1000 * 60 * 60 * UTCOffset);
    const localDate = new Date(localDateValue);
    // Get the hour.
    const localDateHour = localDate.getUTCHours();
    // Get the name of the day of the week,
    // and if the hour is at night, add 'night'.
    const weekday = (localDateHour >= 6 && localDateHour < 18) ? this._getWeekDay(localDate) : this._getWeekDay(localDate) + ' night';
    // Retrieve the forecast for that day of the week.
    return forecastData.get(weekday);
  }

  /**
   * Helper method.
   * Turns a Date instance into a UTC Timestamp compatible with Environment Canada's weather data.
   * @param {<Date>} date The date to forecast.
   * @returns {string}    The UTC Timestamp.
   */
  _makeUTCTimestamp(date) {
    const year = date.getUTCFullYear().toString();
  
    let month = date.getUTCMonth() + 1;
    month = month.toString();
    if (month.length < 2) month = '0' + month;
  
    let day = date.getUTCDate().toString();
    if (day.length < 2) day = '0' + day;
  
    let hour = date.getUTCHours().toString();
    if (hour.length < 2) hour = '0' + hour;
  
    return year + month + day + hour + '00';
  }
  
  /**
   * Helper method.
   * Expands the abbreviated weekday text returned from a Date object.
   * @param {<Date>} date The localized date to forecast.
   * @returns {string}    Full weekday name.
   */
  _getWeekDay(date) {
    const partial = date.toUTCString().slice(0, 3);
    const days = new Map([
      [ 'sun', 'sunday' ],
      [ 'mon', 'monday' ],
      [ 'tue', 'tuesday' ],
      [ 'wed', 'wednesday' ],
      [ 'thu', 'thursday' ],
      [ 'fri', 'friday' ],
      [ 'sat', 'saturday' ]
    ]);
    return days.get(partial.toLowerCase());
  }
}

module.exports = Weather;