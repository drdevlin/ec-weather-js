# ECWeatherJS

The Unofficial, JavaScript Environment Canada Weather API.

## Installation

```bash
npm install ec-weather-js
```

## Usage

First, fetch weather data for a certain station from Environment Canada's RSS feed. This will provide XML data, so parse as text.

(This library does not fetch data.)

Next, pass this data into the Weather constructor:
```js
const Weather = require('ec-weather-js');
const weather = new Weather(fetchedXMLWeatherData);
```

Now you can retrieve all the data as a javascript-friendly object:
```js
weather.all
```

Or just the current conditions:
```js
weather.current
```

Or the forecast for a specific date:
```js
weather.forecast(date)
```

### Weekly and Hourly Forecasts

```js
weather.weekly
```
and
```js
weather.hourly
```
will return an array of the respective forecasts.

Chain ```.temperatures```, ```.precipitation```, and ```.wind``` to further narrow the array.

For example,
```js
weather.hourly.precipitation
```
returns an array precipitation forecasts by the hour.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss.

Make sure to update tests as appropriate.

[CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](https://choosealicense.com/licenses/mit/)