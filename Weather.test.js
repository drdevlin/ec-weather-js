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
    })
  })
})