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
      return this.map(el => {
        return { 
          day: el.day,
          value: Number(el.temperatures.temperature.value),
          humidex: (el.humidex && el.humidex.hasOwnProperty('value')) ? Number(el.humidex.value) : null,
          windChill: (el.windChill && el.windChill.hasOwnProperty('calculated')) ? Number(el.windChill.calculated.value) : null
        };
      });
    }
    if (this[0].hasOwnProperty('hour')) {
      return this.map(el => {
        return { 
          hour: el.hour, 
          value: Number(el.temperature.value) ,
          humidex: (el.humidex && el.humidex.hasOwnProperty('value')) ? Number(el.humidex.value) : null,
          windChill: (el.windChill && el.windChill.hasOwnProperty('value')) ? Number(el.windChill.value) : null
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
      return this.map(el => {
        return {
          day: el.day,
          pop: (el.abbreviatedForecast.pop.value) ? Number(el.abbreviatedForecast.pop.value) : 0,
          type: (el.precipitation.precipType.value) ? el.precipitation.precipType.value : null
        };
      });
    }
    if (this[0].hasOwnProperty('hour')) {
      return this.map(el => {
        return {
          hour: el.hour,
          condition: el.condition,
          lop: (el.lop.value) ? Number(el.lop.value) : 0,
        };
      });
    }
  }

  /**
   * @returns {Object[]} An array of wind data: speed, gust, direction.
   */
  get winds() {
    if (this[0].hasOwnProperty('day')) {
      return this.map(el => {
        const mapped = (el.winds) ? 
          {
            day: el.day,
            speed: Number(el.winds.wind[1].speed.value),
            gust: Number(el.winds.wind[1].gust.value),
            direction: el.winds.wind[1].direction
          } :
          {
            day: el.day,
            speed: null,
            gust: null,
            direction: null
          };
        return mapped;
      });
    }
    if (this[0].hasOwnProperty('hour')) {
      return this.map(el => {
        const mapped = (el.wind) ? 
          {
            hour: el.hour,
            speed: Number(el.wind.speed.value),
            gust: (el.wind.gust.hasOwnProperty('value')) ? Number(el.wind.gust.value) : null,
            direction: el.wind.direction.value
          } :
          {
            hour: el.hour,
            speed: null,
            gust: null,
            direction: null
          };
        return mapped;
      });
    }
  }
}

module.exports = ForecastArray;