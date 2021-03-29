const { xml2js } = require('xml-js');

class Parse {
  constructor(data) {
    this.data = data;
  }

  convert() {
    const converted = xml2js(this.data, { compact: true });

    const mainData = converted.siteData;
    delete mainData.license;
    delete mainData.dateTime;
    delete mainData._attributes;

    return new Parse(mainData);
  }

  normalize() {
    const recurse = (data) => {
      if (!Array.isArray(data)) {
        // base case
        const copy = { ...data };
        let attributesAndValue = {};
        if (copy.hasOwnProperty('_attributes')) {
          attributesAndValue = { ...copy._attributes };
          delete copy._attributes;
        }
        if (copy.hasOwnProperty('_text')) {
          attributesAndValue.value = copy._text;
          delete copy._text;
        }
        // recurse over other objects, including arrays
        for (const prop in copy) {
          if (typeof copy[prop] === 'object') copy[prop] = recurse(copy[prop]);
        }
        return { ...attributesAndValue, ...copy };
      } else {
        // recurse over objects in array
        return data.map(el => recurse(el));
      }
    }
    const result = recurse(this.data);
    return new Parse(result);
  }

  simplify() {
    const recurse = (data) => {
      if (!Array.isArray(data)) {
        // base case
        const copy = { ...data };
        const props = Object.entries(copy).map(el => el[0]);
        if (props.length === 0) {
          return null;
        } else if (props.length === 1 && copy.hasOwnProperty('value')) {
          return copy.value;
        } else {
          // recurse over other objects, including arrays
          for (const prop in copy) {
            if (typeof copy[prop] === 'object') copy[prop] = recurse(copy[prop]);
          }
          return copy;
        }
      } else {
        // recurse over objects in array
        return data.map(el => recurse(el));
      }
    }
    const result = recurse(this.data);
    return new Parse(result);
  }

  restructure() {
    const result = { ...this.data };
    const forecast = new Map();
    result.forecastGroup.forecast.forEach(el => {
      const copy = { ...el };
      delete copy.period;
      forecast.set(el.period.value, copy);
    });
    result.regionalNormals = result.forecastGroup.regionalNormals;
    delete result.forecastGroup;
    result.hourlyForecastGroup.hourlyForecast.forEach(el => {
      const copy = { ...el };
      delete copy.dateTimeUTC;
      forecast.set(el.dateTimeUTC, copy);
    });
    delete result.hourlyForecastGroup;
    result.forecast = forecast;
    return new Parse(result);
  }
}

module.exports = Parse;