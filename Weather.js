/**
 * A javascript API for Environment Canada's weather data.
 * @module
 */

const Parse = require("./Parse");
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

  /**
   * @returns {Object} All current conditions.
   */
  get current() {
    return this._data.currentConditions;
  }

  /**
   * @returns {<ForecastArray>} An array of the weekly forecast
   */
  get weekly() {
    const result = new ForecastArray;
    let i = 0;
    for (let [ key, value ] of this._data.forecast) {
      if (i >= 13) break;
      result.push({ day: key, ...value });
      i++;
    }
    return result;
  }

  /**
   * @returns {<ForecastArray} An array of the hourly forecast
   */
  get hourly() {
    const result = new ForecastArray;
    let i = 0;
    for (let [ key, value ] of this._data.forecast) {
      if (i >= 13) result.push({ hour: key, ...value });
      i++;
    }
    return result;
  }

  get date() {
    return new Date(Date.UTC(
      Number(this._data.currentConditions.dateTime[0].year),
      Number(this._data.currentConditions.dateTime[0].month.value) - 1,
      Number(this._data.currentConditions.dateTime[0].day.value),
      Number(this._data.currentConditions.dateTime[0].hour),
      Number(this._data.currentConditions.dateTime[0].minute)
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
    if (typeof date !== 'string' && !(date instanceof Date)) throw new TypeError('Argument must be a string or Date instance');
    const forecastData = this._data.forecast;
    
    // First, straightforwardly retrieve the value if the key exists
    if (typeof date === 'string') {
      date = date.toLowerCase();
      if (forecastData.has(date)) return forecastData.get(date);
    }
    
    if (date instanceof Date) {
      const utcTimestamp = this._makeUTCTimestamp(date);

      // Retreive the value if the timestamp is a key
      if (forecastData.has(utcTimestamp)) {
        return forecastData.get(utcTimestamp);

      // Otherwise,
      } else {
        // check whether the date given is within range.
        // this.date = startTime
        const endTime = new Date(this.date.getTime() + (1000 * 60 * 60 * 24 * 7));
        const isInRange = date.getTime() >= this.date.getTime() && date.getTime() <= endTime.getTime();
        
        // If it is,
        if (isInRange) {
          // determine the local date
          const UTCOffset = Number(this._data.currentConditions.dateTime[1].UTCOffset);
          const localDateValue = date.getTime() + (1000 * 60 * 60 * UTCOffset);
          const localDate = new Date(localDateValue);
          // get the hour
          const localDateHour = localDate.getUTCHours();
          // get the name of the day of the week
          // and if the hour is at night, add 'night'
          const weekday = (localDateHour >= 6 && localDateHour < 18) ? this._getWeekDay(localDate) : this._getWeekDay(localDate) + ' night';
          // retrieve the forecast for that day of the week.
          return forecastData.get(weekday);
        }
      }
    }
    
    // If the date given doesn't work for any of this, 
    // then there's no data for that date and the method with return undefined.
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