const Weather = require('./Weather');
const { testdata } = require('./testdata');
const ForecastArray = require('./ForecastArray');

const fetchedData = `
  <?xml version='1.0' encoding='ISO-8859-1'?>
  <siteData>
  <license>text</license>
  <dateTime></dateTime>
  <dateTime></dateTime>
  <one attr1='foo' attr2='bar'>baz</one>
  <two>bing</two>
  <two>bang</two>
  <three><four></four></three>
  <currentConditions>
    <foo>bar</foo>
  </currentConditions>
  <forecastGroup>
    <regionalNormals>
      <textSummary>text</textSummary>
    </regionalNormals>
    <forecast>
      <period textForecastName="Today">Wednesday</period>
      <textSummary>text</textSummary>
    </forecast>
    <forecast>
      <period textForecastName="Tomorrow">Thursday</period>
      <textSummary>text</textSummary>
    </forecast>
  </forecastGroup>
  <hourlyForecastGroup>
    <hourlyForecast dateTimeUTC="202101280300">
      <condition>Rain</condition>
    </hourlyForecast>
    <hourlyForecast dateTimeUTC="202101280400">
      <condition>Sunny</condition>
    </hourlyForecast>
  </hourlyForecastGroup>
  </siteData>
`;

const forecastMap = new Map();
forecastMap.set('wednesday', { textSummary: 'text' });
forecastMap.set('thursday', { textSummary: 'text' });
forecastMap.set('202101280300', { condition: 'Rain' });
forecastMap.set('202101280400', { condition: 'Sunny' });

describe('Weather', () => {

  describe('constructor(fetchedXMLWeatherData)', () => {
    it('stores the original fetched weather data', () => {
      const weather = new Weather(testdata);

      expect(weather._originalXML).toStrictEqual(testdata);
    });
    it('converts, parses, and stores weather data as an object', () => {
      const expected = {
        one: { attr1: 'foo', attr2: 'bar', value: 'baz' },
        two: [ 'bing', 'bang' ],
        three: { four: null },
        regionalNormals: { textSummary: 'text' },
        forecast: forecastMap
      };

      const weather = new Weather(fetchedData);

      expect(weather._data).toMatchObject(expected);
    });
    it('throws an informative Error if fetched data is falsy', () => {
      const attempt = () => {
        const weather = new Weather();
      };
      
      expect(attempt).toThrow(TypeError);
      expect(attempt).toThrow(/constructor/i);
    });
    it('throws an informative Error if fetched data is not a string', () => {
      const numberAttempt = () => {
        const weather = new Weather(99);
      };
      const arrayAttempt = () => {
        const weather = new Weather([ 9, 9 ]);
      };
      const objectAttempt = () => {
        const weather = new Weather({ '9': 9 });
      };
      
      expect(numberAttempt).toThrow(TypeError);
      expect(numberAttempt).toThrow(/string/i);
      expect(arrayAttempt).toThrow(/string/i);
      expect(objectAttempt).toThrow(/string/i);
    });
  });

  describe('get all()', () => {
    it('returns all data parsed', () => {
      const expected = {
        one: { attr1: 'foo', attr2: 'bar', value: 'baz' },
        two: [ 'bing', 'bang' ],
        three: { four: null },
        regionalNormals: { textSummary: 'text' },
        forecast: forecastMap
      };

      const weather = new Weather(fetchedData);

      expect(weather.all).toMatchObject(expected);
    });
  });

  describe('get raw()', () => {
    it('returns the original XML data', () => {
      const weather = new Weather(testdata);

      expect(weather.raw).toStrictEqual(testdata);
    });
  });

  describe('get current()', () => {
    it('returns all current weather conditions', () => {
      const weather = new Weather(fetchedData);

      const expected = { foo: 'bar' };

      expect(weather.current).toMatchObject(expected);
    });
  });

  describe('get weekly()', () => {
    it('returns a ForecastArray of the weekly weather data', () => {
      const weather = new Weather(testdata);
      
      expect(weather.weekly).toBeInstanceOf(ForecastArray);
      expect(weather.weekly.length).toStrictEqual(13);
    });
  });

  describe('get hourly()', () => {
    it('returns a ForecastArray of the hourly weather data', () => {
      const weather = new Weather(testdata);

      expect(weather.hourly).toBeInstanceOf(ForecastArray);
      expect(weather.hourly.length).toStrictEqual(24);
    });
  });

  describe('get date()', () => {
    it('returns a Date object of the current date and time', () => {
      const weather = new Weather(testdata);

      const expected = new Date(Date.UTC(2021, 0, 27, 15, 0));

      expect(weather.date).toMatchObject(expected);
    });
  });

  describe('forecast(date)', () => {
    describe('when passed a string', () => {
      it('returns all forecast data for a given day of the week', () => {
        const weather = new Weather(testdata);
  
        const results = weather.forecast('FrIdaY');
        const expected = {
          textSummary: 'A mix of sun and cloud. High minus 7.',
          cloudPrecip: { textSummary: 'A mix of sun and cloud.' },
          abbreviatedForecast: {
            iconCode: { format: 'gif', value: '02' },
            pop: { units: '%' },
            textSummary: 'A mix of sun and cloud'
          },
          temperatures: {
            textSummary: 'High minus 7.',
            temperature: { unitType: 'metric', units: 'C', class: 'high', value: '-7' }
          },
          winds: null,
          humidex: null,
          precipitation: { textSummary: null, precipType: { start: '', end: '' } },
          relativeHumidity: { units: '%', value: '60' }
        };
  
        expect(results).toMatchObject(expected);
      });
    });
    describe('when passed a Date object within the hourly forecast', () => {
      it('returns all forecast data for the given hour', () => {
        const weather = new Weather(testdata);
        const date = new Date(2021, 0, 27, 15, 12);

        const results = weather.forecast(date);
        const expected = {
          condition: 'Cloudy',
          iconCode: { format: 'png', value: '10' },
          temperature: { unitType: 'metric', units: 'C', value: '-4' },
          lop: { category: 'Low', units: '%', value: '10' },
          windChill: { unitType: 'metric', value: '-10' },
          humidex: { unitType: 'metric' },
          wind: {
            speed: { unitType: 'metric', units: 'km/h', value: '20' },
            direction: { windDirFull: 'Northwest', value: 'NW' },
            gust: { unitType: 'metric', units: 'km/h' }
          }
        };
        expect(results).toMatchObject(expected);
      });
    });
    describe('when passed a Date object outside hourly but within weekly forecast', () => {
      it('returns all forecast data for the day/night', () => {
        const weather = new Weather(testdata);
        const dateDaytime = new Date(2021, 0, 30, 12, 12);
        const dateNighttime = new Date(2021, 0, 30, 23, 12);

        const expectedDaytime = {
          textSummary: 'A mix of sun and cloud. High minus 6.',
          cloudPrecip: { textSummary: 'A mix of sun and cloud.' },
          abbreviatedForecast: {
            iconCode: { format: 'gif', value: '02' },
            pop: { units: '%' },
            textSummary: 'A mix of sun and cloud'
          },
          temperatures: {
            textSummary: 'High minus 6.',
            temperature: { unitType: 'metric', units: 'C', class: 'high', value: '-6' }
          },
          winds: null,
          humidex: null,
          precipitation: { textSummary: null, precipType: { start: '', end: '' } },
          relativeHumidity: { units: '%', value: '55' }
        };
        const expectedNighttime = {
          textSummary: 'Cloudy. Low minus 9.',
          cloudPrecip: { textSummary: 'Cloudy.' },
          abbreviatedForecast: {
            iconCode: { format: 'gif', value: '10' },
            pop: { units: '%' },
            textSummary: 'Cloudy'
          },
          temperatures: {
            textSummary: 'Low minus 9.',
            temperature: { unitType: 'metric', units: 'C', class: 'low', value: '-9' }
          },
          winds: null,
          humidex: null,
          precipitation: { textSummary: null, precipType: { start: '', end: '' } },
          relativeHumidity: { units: '%', value: '80' }
        };
        
        const resultsDaytime = weather.forecast(dateDaytime);
        const resultsNighttime = weather.forecast(dateNighttime);
        
        expect(resultsDaytime).toMatchObject(expectedDaytime);
        expect(resultsNighttime).toMatchObject(expectedNighttime);
      });
    });
    describe('when passed a date outside the range of the data', () => {
      it('returns undefined', () => {
        const weather = new Weather(testdata);
        const date = new Date(2022, 0, 1, 1, 1);

        expect(weather.forecast(date)).toBeUndefined();
      });
    });
    describe('when passed something other than a string or Date object', () => {
      it('throws an Error', () => {
        const weather = new Weather(testdata);

        const numberAttempt = () => {
          weather.forecast(99);
        };
        const arrayAttempt = () => {
          weather.forecast([ 9, 9 ]);
        };
        const objectAttempt = () => {
          weather.forecast({ '9': 9 });
        };
  
        expect(numberAttempt).toThrow();
        expect(arrayAttempt).toThrow();
        expect(objectAttempt).toThrow();
      });
    });
  });
  describe('_makeUTCTimestamp(date)', () => {
    it('returns the corresponding UTC Timestamp of the given Date', () =>{
      const weather = new Weather(testdata);
      const date = new Date(Date.UTC(2011, 1, 1, 1, 1));

      const expected = '201102010100';

      expect(weather._makeUTCTimestamp(date)).toStrictEqual(expected);
    });
  });
  describe('_getWeekDay(date)', () => {
    it('returns the expanded weekday name of the date', () => {
      const weather = new Weather(testdata);
      const date = new Date(Date.UTC(2011, 1, 1, 1, 1));

      const expected = 'tuesday';

      expect(weather._getWeekDay(date)).toStrictEqual(expected);
    });
  });
});