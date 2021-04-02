const ForecastArray = require('./ForecastArray');
const Weather = require('./Weather');
const { testdata } = require('./testdata');

const weeklyForecast = new ForecastArray();
const hourlyForecast = new ForecastArray();
weeklyForecast.push({ 
  day: 'monday',
  temperatures: { temperature: { value: '1' }},
  abbreviatedForecast: { pop: { value: '60' }},
  precipitation: { precipType: { value: 'rain' }}
});
hourlyForecast.push({ 
  hour: '202101271600',
  temperature: { value: '1' },
  condition: 'Rain',
  lop: { value: '60' }
});

describe('ForecastArray()', () => {
  it('extends Array', () => {
    const instance = new ForecastArray();
    const attempt = () => {
      instance.push('foo');
    };
    expect(instance instanceof Array).toBeTruthy();
    expect(attempt).not.toThrow();
    expect(instance[0]).toStrictEqual('foo');
  });
  describe('get temperatures()', () => {
    it('returns an array of temperatures', () => {
      expect(weeklyForecast.temperatures).toMatchObject([ { day: 'monday', value: 1 } ]);
      expect(hourlyForecast.temperatures).toMatchObject([ { hour: '202101271600', value: 1 } ]);
    });
  });
  describe('get precipitation()', () => {
    it('returns an array of precipitation data', () => {
      expect(weeklyForecast.precipitation).toMatchObject([ { day: 'monday', pop: 60, type: 'rain' }]);
      expect(hourlyForecast.precipitation).toMatchObject([ { hour: '202101271600', condition: 'Rain', lop: 60 }]);
    });
  });
});