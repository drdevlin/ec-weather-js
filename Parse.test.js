const Parse = require('./Parse');
const { testdata } = require('./testdata');

describe('Parse(data)', () => {
  describe('constructor(data)', () => {
    it('stores the given data in a "data" property', () => {
      const parse = new Parse(testdata);

      expect(parse.data).toStrictEqual(testdata);
    });
  });
  describe('convert()', () => {
    it('converts original fetched XML data to js object and extracts main data', () => {
      const input = `
      <?xml version='1.0' encoding='ISO-8859-1'?>
      <siteData xmlns:xsi="bing" xsi:noNamespaceSchemaLocation="bong">
      <license>text</license>
      <dateTime></dateTime>
      <dateTime></dateTime>
      <one attr1='foo' attr2='bar'>baz</one>
      <two>bing</two>
      <two>bang</two>
      </siteData>
      `;

      const expected = new Parse({
        one: { _attributes: { attr1: 'foo', attr2: 'bar' }, _text: 'baz' },
        two: [ { _text: 'bing' }, { _text: 'bang' } ]
      });

      const parse = new Parse(input);
      const converted = parse.convert();

      expect(converted).toMatchObject(expected);
      expect(converted.data.hasOwnProperty('license')).toBeFalsy();
      expect(converted.data.hasOwnProperty('dateTime')).toBeFalsy();
      expect(converted.data.hasOwnProperty('_attributes')).toBeFalsy();
    });
    it('throws an error if the data is not XML', () => {
      const parse = new Parse('foo');

      const attempt = () => {
        parse.convert();
      }
      
      expect(attempt).toThrow();
    });
    it('throws informative error if the data is not weather data from Environment Canada', () => {
      const parse = new Parse("<?xml version='1.0' encoding='ISO-8859-1'?>");

      const attempt = () => {
        parse.convert();
      }

      expect(attempt).toThrow(TypeError);
      expect(attempt).toThrow(/weather data/i);
    })
  });
  describe('normalize()', () => {
    it('removes "_attributes" prop and renames "_text" to "value"', () => {
      const input = {
        one: { _attributes: { attr1: 'foo', attr2: 'bar' }, _text: 'baz' },
        two: [ { _text: 'bing' }, { _text: 'bang' } ],
      };

      const expected = new Parse({
        one: { attr1: 'foo', attr2: 'bar', value: 'baz' },
        two: [ { value: 'bing' }, { value: 'bang' } ]
      });

      const parse = new Parse(input);

      expect(parse.normalize(input)).toMatchObject(expected);
    });
  });
  describe('simplify()', () => {
    it('removes extraneous objects', () => {
      const input = {
        one: { attr1: 'foo', attr2: 'bar', value: 'baz' },
        two: [ { value: 'bing' }, { value: 'bang' } ],
        three: { four: {} }
      };

      const expected = new Parse({
        one: { attr1: 'foo', attr2: 'bar', value: 'baz' },
        two: [ 'bing', 'bang' ],
        three: { four: null }
      });

      const parse = new Parse(input);

      expect(parse.simplify(input)).toMatchObject(expected);
    });
  });
  describe('restructure()', () => {
    it('restructures forecasts into a Map', () => {
      const input = {
        forecastGroup: {
          regionalNormals: { regional: 'normals' },
          forecast: [ 
            { period: { value: 'foo' }, otherProp: 'bing' },
            { period: { value: 'bar' }, otherProp: 'bong' }
          ]
        },
        hourlyForecastGroup: {
          hourlyForecast: [
            { dateTimeUTC: 'baz', otherProp: 'bang' },
            { dateTimeUTC: 'goo', otherProp: 'clang' }
          ]
        }
      };

      const expectedForecastMap = new Map();
      expectedForecastMap.set('foo', { otherProp: 'bing' });
      expectedForecastMap.set('bar', { otherProp: 'bong' });
      expectedForecastMap.set('baz', { otherProp: 'bang' });
      expectedForecastMap.set('goo', { otherProp: 'clang' });

      const expectedResult = new Parse({
        regionalNormals: { regional: 'normals' },
        forecast: expectedForecastMap
      });

      const parse = new Parse(input);

      expect(parse.restructure(input)).toMatchObject(expectedResult);
    })
  })
})