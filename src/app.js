const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlers engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather App",
		name: "Alfredo Park",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		name: "Alfredo Park",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		text: "Help wanted",
		title: "Help",
		name: "Alfredo Park",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "You must provide an address!",
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

	// res.send({
	// 	location: geocode.location,
	// 	address: req.query.address,
	// 	forecast: 20,
	// });
});

app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "You must provide a search term!",
		});
	}
	console.log(req.query.search);
	res.send({
		products: [],
	});
});

app.get("help/*", (req, res) => {
	res.render("404", {
		title: "Error",
		error: "Help article not found",
		name: "Alfredo Park",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "Error",
		error: "404 Page not found",
		name: "Alfredo Park",
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
