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
    it('converts and stores weather data as an object', () => {
      const fetchedData = "<?xml version='1.0' encoding='ISO-8859-1'?>";

      const weather = new Weather(fetchedData);

      expect(weather._data).toBeInstanceOf(Object);
    });
  });
  describe('_convert(originalXML)', () => {
    it('converts and organizes original fetched data', () => {
      const fetchedData = `
      <?xml version='1.0' encoding='ISO-8859-1'?>
      <siteData>
      <one attr1='foo' attr2='bar'>baz</one>
      <two>bing</two>
      <two>bang</two>
      </siteData>
      `;

      const expected = {
        one: { attr1: 'foo', attr2: 'bar', value: 'baz' },
        two: [ { value: 'bing' }, { value: 'bang' } ]
      }

      const weather = new Weather(fetchedData);
      console.log(weather._convert(fetchedData));

      expect(weather._convert(fetchedData)).toMatchObject(expected);
    });
  });
  describe('_organize(convertedObject)', () => {
    it('recursively organizes objects converted by xml2js', () => {
      const convertedObject = {
        one: { _attributes: { attr1: 'foo', attr2: 'bar' }, _text: 'baz' },
        two: [ { _text: 'bing' }, { _text: 'bang' } ]
      };

      const expected = {
        one: { attr1: 'foo', attr2: 'bar', value: 'baz' },
        two: [ { value: 'bing' }, { value: 'bang' } ]
      };

      const weather = new Weather(testdata);

      expect(weather._organize(convertedObject)).toMatchObject(expected);
    })
  })
})