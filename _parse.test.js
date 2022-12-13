const {
  convert,
  normalize,
  simplify,
  restructure,
} = require('./parse');

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

    const expected = {
      one: { _attributes: { attr1: 'foo', attr2: 'bar' }, _text: 'baz' },
      two: [ { _text: 'bing' }, { _text: 'bang' } ]
    };

    const converted = convert(input);

    expect(converted).toMatchObject(expected);
    expect(converted).not.toHaveProperty('license');
    expect(converted).not.toHaveProperty('dateTime');
    expect(converted).not.toHaveProperty('_attributes');
  });
  it('throws an error if the data is not XML', () => {
    const attempt = () => {
      convert('foo');
    };
    
    expect(attempt).toThrow();
  });
  it('throws informative error if the data is not weather data from Environment Canada', () => {
    const attempt = () => {
      convert(`<?xml version='1.0' encoding='ISO-8859-1'?>`);
    };

    expect(attempt).toThrow(TypeError);
    expect(attempt).toThrow(/weather data/i);
  });
});
describe('normalize()', () => {
  it('removes "_attributes" prop and renames "_text" to "value"', () => {
    const input = {
      one: { _attributes: { attr1: 'foo', attr2: 'bar' }, _text: 'baz' },
      two: [ { _text: 'bing' }, { _text: 'bang' } ],
    };

    const expected = {
      one: { attr1: 'foo', attr2: 'bar', value: 'baz' },
      two: [ { value: 'bing' }, { value: 'bang' } ]
    };

    expect(normalize(input)).toMatchObject(expected);
  });
});
describe('simplify()', () => {
  it('removes extraneous objects', () => {
    const input = {
      one: { attr1: 'foo', attr2: 'bar', value: 'baz' },
      two: [ { value: 'bing' }, { value: 'bang' } ],
      three: { four: {} }
    };

    const expected = {
      one: { attr1: 'foo', attr2: 'bar', value: 'baz' },
      two: [ 'bing', 'bang' ],
      three: { four: null }
    };

    expect(simplify(input)).toMatchObject(expected);
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

    const expectedResult = {
      regionalNormals: { regional: 'normals' },
      forecast: expectedForecastMap
    };

    expect(restructure(input)).toMatchObject(expectedResult);
  });
  describe('when no weekly forecasts', () => {
    it('returns null regional normals and a partial forecast map', () => {
      const input = {
        hourlyForecastGroup: {
          hourlyForecast: [
            { dateTimeUTC: 'baz', otherProp: 'bang' },
            { dateTimeUTC: 'goo', otherProp: 'clang' }
          ]
        }
      };

      const expectedForecastMap = new Map();
      expectedForecastMap.set('baz', { otherProp: 'bang' });
      expectedForecastMap.set('goo', { otherProp: 'clang' });

      const expectedResult = {
        regionalNormals: null,
        forecast: expectedForecastMap
      };

      expect(restructure(input)).toMatchObject(expectedResult);
    });
  });
  describe('when no hourly forecasts', () => {
    it('returns a partial forecast map', () => {
      const input = {
        forecastGroup: {
          regionalNormals: { regional: 'normals' },
          forecast: [ 
            { period: { value: 'foo' }, otherProp: 'bing' },
            { period: { value: 'bar' }, otherProp: 'bong' }
          ]
        }
      };

      const expectedForecastMap = new Map();
      expectedForecastMap.set('foo', { otherProp: 'bing' });
      expectedForecastMap.set('bar', { otherProp: 'bong' });

      const expectedResult = {
        regionalNormals: { regional: 'normals' },
        forecast: expectedForecastMap
      };

      expect(restructure(input)).toMatchObject(expectedResult);
    });
  });
  describe('when neither forecasts', () => {
    it('returns null regional normals and an empty forecast map', () => {
      const input = { /* no forecastGroup or hourlyForecastGroup */ };

      const expectedResult = {
        regionalNormals: null,
        forecast: new Map()
      };

      expect(restructure(input)).toMatchObject(expectedResult);
    });
  });
});
