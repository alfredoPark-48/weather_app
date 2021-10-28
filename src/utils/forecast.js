const baseModule = require('hbs');
const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=bdea3b4f15616a8dd241b0d245618704&query=${latitude},${longitude}`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location. Try again.', undefined);
    } else {
      callback(undefined, {
        description: `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity}.`,
        icon: body.current.weather_icons[0],
      });
    }
  });
};

module.exports = forecast;
