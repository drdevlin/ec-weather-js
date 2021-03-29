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

  forecast(date) {
    if (typeof date !== 'string' && !(date instanceof Date)) throw new TypeError('Argument must be a string or Date instance');
    const forecastData = this._data.forecast;

    if (typeof date === 'string') {
      date = date.toLowerCase();
      if (forecastData.has(date)) return forecastData.get(date);
    }

    if (date instanceof Date) {
      const utcTimestamp = makeUTCTimestamp(date);
      if (forecastData.has(utcTimestamp)) {
        return forecastData.get(utcTimestamp);
      } else {
        const yearOfCurrentConditions = Number(this._data.currentConditions.dateTime[0].year);
        const monthOfCurrentConditions = Number(this._data.currentConditions.dateTime[0].month.value) - 1;
        const dateOfCurrentConditions = Number(this._data.currentConditions.dateTime[0].day.value);
        const hourOfCurrentConditions = Number(this._data.currentConditions.dateTime[0].hour);
        const startTime = new Date(Date.UTC(
          yearOfCurrentConditions,
          monthOfCurrentConditions,
          dateOfCurrentConditions,
          hourOfCurrentConditions
        ));
        const endTime = new Date(startTime.getTime() + (1000 * 60 * 60 * 24 * 7));
        const isInRange = date.getTime() >= startTime.getTime() && date.getTime() <= endTime.getTime();

        if (isInRange) {
          const UTCOffset = Number(this._data.currentConditions.dateTime[1].UTCOffset);
          const localDateValue = date.getTime() + (1000 * 60 * 60 * UTCOffset);
          const localDate = new Date(localDateValue);
          const localDateHour = localDate.getUTCHours();
          const weekday = (localDateHour >= 6 && localDateHour < 18) ? getWeekDay(localDate) : getWeekDay(localDate) + ' night';
          return forecastData.get(weekday);
        }
      }
    }
    

    
  }
}

function makeUTCTimestamp(date) {
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

function getWeekDay(date) {
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

module.exports = Weather;