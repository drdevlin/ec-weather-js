const Weather = require('./Weather');
const { testdata } = require('./testdata');

describe('Weather', () => {
  describe('constructor(fetchedXMLWeatherData)', () => {
    it('stores the original fetched weather data', () => {
      const weather = new Weather(testdata);

      expect(weather._originalXML).toStrictEqual(testdata);
    });
    it('throws an Error if fetched data is not a string', () => {
      const numberAttempt = () => {
        const weather = new Weather(99);
      }
      const arrayAttempt = () => {
        const weather = new Weather([ 9, 9 ]);
      }
      const objectAttempt = () => {
        const weather = new Weather({ '9': 9 });
      }

      expect(numberAttempt).toThrow();
      expect(arrayAttempt).toThrow();
      expect(objectAttempt).toThrow();
    });
    it('converts, parses, and stores weather data as an object', () => {
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
      forecastMap.set('Wednesday', { textSummary: 'text' });
      forecastMap.set('Thursday', { textSummary: 'text' });
      forecastMap.set('202101280300', { condition: 'Rain' });
      forecastMap.set('202101280400', { condition: 'Sunny' });

      const expected = {
        one: { attr1: 'foo', attr2: 'bar', value: 'baz' },
        two: [ 'bing', 'bang' ],
        three: { four: null },
        regionalNormals: { textSummary: 'text' },
        forecast: forecastMap
      }

      const weather = new Weather(fetchedData);

      expect(weather._data).toMatchObject(expected);
    });
  });
})