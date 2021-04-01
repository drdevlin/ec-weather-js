const ForecastArray = require('./ForecastArray');

const weeklyForecast = new ForecastArray();
const hourlyForecast = new ForecastArray();
weeklyForecast.push({ 
  day: 'monday',
  temperatures: { temperature: { value: '1' }} 
});
hourlyForecast.push({ 
  hour: '202101271600',
  temperature: { value: '1' } 
});

describe('ForecastArray()', () => {
  it('extends Array', () => {
    const instance = new ForecastArray();
    const attempt = () => {
      instance.push('foo');
    }
    expect(instance instanceof Array).toBeTruthy();
    expect(attempt).not.toThrow();
    expect(instance[0]).toStrictEqual('foo');
  });
  describe('get temperatures()', () => {
    it('returns an array of temperatures', () => {
      expect(weeklyForecast.temperatures).toMatchObject([ { day: 'monday', value: 1 } ]);
      expect(hourlyForecast.temperatures).toMatchObject([ { hour: '202101271600', value: 1 } ]);
    })
  })
});