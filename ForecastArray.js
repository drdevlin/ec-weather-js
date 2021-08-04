const nestedProp = require("./helpers/nestedProp");

/**
 * @classdesc An extended Array with getters for extracting specific forecast data.
 * Getters: temperatures, precipitation, winds
 */
class ForecastArray extends Array {

  /**
   * @returns {Object[]} An array of temperature data: value (actual temp), humidex, windChill.
   */
  get temperatures() {
    if (this[0].hasOwnProperty('day')) {
      return this.map(forecast => (
        { 
          day: forecast.day,
          value: forecast.temperatures?.temperature?.value,
          humidex: forecast.humidex?.value,
          windChill: forecast.windChill?.calculated?.value
        }
      ));
    }
    if (this[0].hasOwnProperty('hour')) {
      return this.map(forecast => (
        { 
          hour: forecast.hour, 
          value: forecast.temperature?.value,
          humidex: forecast.humidex?.value,
          windChill: forecast.windChill?.value
        }
      ));
    }
  }

  /**
   * @returns {Object[]} An array of precipitation data.
   * Weekly contains pop (chance of) and type.
   * Hourly contains lop (chance of) and condition.
   */
  get precipitation() {
    if (this[0].hasOwnProperty('day')) {
      return this.map(forecast => (
        {
          day: forecast.day,
          pop: forecast.abbreviatedForecast?.pop?.value,
          type: forecast.precipitation?.precipType?.value
        }
      ));
    }
    if (this[0].hasOwnProperty('hour')) {
      return this.map(forecast => (
        {
          hour: forecast.hour,
          condition: forecast.condition,
          lop: forecast.lop?.value
        }
      ));
    }
  }

  /**
   * @returns {Object[]} An array of wind data: speed, gust, direction.
   */
  get winds() {
    if (this[0].hasOwnProperty('day')) {
      return this.map(forecast => (
        {
          day: forecast.day,
          speed: forecast.winds?.wind?.[1]?.speed?.value,
          gust: forecast.winds?.wind?.[1]?.gust?.value,
          direction: forecast.winds?.wind?.[1]?.direction
        }
      ));
    }
    if (this[0].hasOwnProperty('hour')) {
      return this.map(forecast => (
        {
          hour: forecast.hour,
          speed: forecast.wind?.speed?.value,
          gust: forecast.wind?.gust?.value,
          direction: forecast.wind?.direction?.value
        }
      ));
    }
  }
}

module.exports = ForecastArray;