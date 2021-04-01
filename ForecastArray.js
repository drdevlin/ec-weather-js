class ForecastArray extends Array {
  get temperatures() {
    if (this[0].hasOwnProperty('day')) {
      return this.map(el => {
        return { day: el.day, value: Number(el.temperatures.temperature.value) };
      });
    }
    if (this[0].hasOwnProperty('hour')) {
      return this.map(el => {
        return { hour: el.hour, value: Number(el.temperature.value) };
      });
    }
  }
}

module.exports = ForecastArray;