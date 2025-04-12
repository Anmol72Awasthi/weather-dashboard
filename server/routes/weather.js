const express = require("express");
const route = express.Router();
const axios = require("axios");

route.get("/weather", async (req, res) => {
  const city = req.query.city;
  // if city name is not provided
  if (!city) {
    return res.status(400).json({ error: "Please enter city name." });
  }
  try {
    const apiKey = process.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    const result = response.data;
    const info = {
      city: result.name,
      temperature: result.main.temp,
      weatherCondition: result.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`,
      humidity: result.main.humidity,
      windSpeed: result.wind.speed,
    };
    res.json(info);
  } catch (err) {
    // city name is not valid
    if (err.response && err.response.status === 404) {
      res.status(404).json({ err: "City not found." });
    } else {
      res.status(500).json({ msg: err.message });
    }
  }
});

module.exports = route;
