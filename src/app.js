const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlers engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Alfredo Jeong Hyun Park',
  });
});

app.get('/about', async (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Alfredo Jeong Hyun Park',
  });
});

app.get('/github', (req, res) => {
  res.render('github', {
    text: 'https://github.com/alfredoPark-48/weather_app',
    title: 'GitHub',
    name: 'Alfredo Jeong Hyun Park',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!',
    });
  }

  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({ err });
    }

    forecast(latitude, longitude, (err, data) => {
      if (err) {
        return res.send({ err });
      }

      res.send({
        location: location,
        forecast: data,
      });
    });
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Error',
    error: '404 Page not found',
    name: 'Alfredo Park',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
