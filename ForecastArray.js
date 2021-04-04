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
      return this.map(forecast => {
        return { 
          day: forecast.day,
          value: nestedProp(forecast, 'temperatures', 'temperature', 'value'),
          humidex: nestedProp(forecast, 'humidex', 'value'),
          windChill: nestedProp(forecast, 'windChill', 'calculated', 'value')
        };
      });
    }
    if (this[0].hasOwnProperty('hour')) {
      return this.map(forecast => {
        return { 
          hour: forecast.hour, 
          value: nestedProp(forecast, 'temperature', 'value'),
          humidex: nestedProp(forecast, 'humidex', 'value'),
          windChill: nestedProp(forecast, 'windChill', 'value')
        };
      });
    }
  }

  /**
   * @returns {Object[]} An array of precipitation data.
   * Weekly contains pop (chance of) and type.
   * Hourly contains lop (chance of) and condition.
   */
  get precipitation() {
    if (this[0].hasOwnProperty('day')) {
      return this.map(forecast => {
        return {
          day: forecast.day,
          pop: nestedProp(forecast, 'abbreviatedForecast', 'pop', 'value'),
          type: nestedProp(forecast, 'precipitation', 'precipType', 'value')
        };
      });
    }
    if (this[0].hasOwnProperty('hour')) {
      return this.map(forecast => {
        return {
          hour: forecast.hour,
          condition: forecast.condition,
          lop: nestedProp(forecast, 'lop', 'value')
        };
      });
    }
  }

  /**
   * @returns {Object[]} An array of wind data: speed, gust, direction.
   */
  get winds() {
    if (this[0].hasOwnProperty('day')) {
      return this.map(forecast => {
        return {
          day: forecast.day,
          speed: nestedProp(forecast, 'winds', 'wind', 1, 'speed', 'value'),
          gust: nestedProp(forecast, 'winds', 'wind', 1, 'gust', 'value'),
          direction: nestedProp(forecast, 'winds', 'wind', 1, 'direction')
        }
      });
    }
    if (this[0].hasOwnProperty('hour')) {
      return this.map(forecast => {
        return {
          hour: forecast.hour,
          speed: nestedProp(forecast, 'wind', 'speed', 'value'),
          gust: nestedProp(forecast, 'wind', 'gust', 'value'),
          direction: nestedProp(forecast, 'wind', 'direction', 'value')
        }
      });
    }
  }
}

module.exports = ForecastArray;