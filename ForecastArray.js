class ForecastArray extends Array {
  get temperatures() {
    if (this[0].hasOwnProperty('day')) {
      return this.map(el => {
        return { 
          day: el.day,
          value: Number(el.temperatures.temperature.value) 
        };
      });
    }
    if (this[0].hasOwnProperty('hour')) {
      return this.map(el => {
        return { 
          hour: el.hour, 
          value: Number(el.temperature.value) 
        };
      });
    }
  }

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
}

module.exports = ForecastArray;