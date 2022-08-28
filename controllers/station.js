"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const stationStore = require("../models/stations-store.js");
const uuid = require("uuid");
const analytics = require("../utils/analytics");
const conversions = require("../utils/conversions");
const axios = require("axios");

const station = {
  async index(request, response) {
    const stationId = request.params.id;

    const station = stationStore.getStation(stationId);

    const latestWeather = analytics.latestWeather(station);

    const lat = station.latitude;
    const lon = station.longitude;
    const requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=fad7f12889f69e90fe6ba9e5ef3a8248`;
    const result = await axios.get(requestUrl);

    let tempTrend = [];
    let trendLabels = [];

    const trends = result.data.daily;

    // console.log(trends);

    for (let i = 0; i < trends.length; i++) {
      tempTrend.push(trends[i].temp.day);
      const date = new Date(trends[i].dt * 1000);
      trendLabels.push(
        `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
      );
    }
    console.log(tempTrend);
    console.log(trendLabels);

    const viewData = {
      title: "Station",
      station: station,
      latestWeather: latestWeather,
      tempChart: tempTrend,
      trendChart: trendLabels,
    };
    response.render("station", viewData);
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting reading ${readingId} from Station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);

    const newReading = {
      id: uuid.v1(),
      code: request.body.code,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      windDirection: request.body.windDirection,
      pressure: request.body.pressure,
      date: new Date().toLocaleString(), //reads 1 HOUR BEHIND! GMTString does the same as does all other functions
    };
    stationStore.addReading(stationId, newReading);
    response.redirect("/station/" + stationId);
  },

  async autoReport(request, response) {
    try {
      const stationId = request.params.id;
      const station = stationStore.getStation(stationId);
      const lat = station.latitude;
      const lon = station.longitude;

      const requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=fad7f12889f69e90fe6ba9e5ef3a8248`;
      const result = await axios.get(requestUrl);

      if (result.status == 200) {
        const reading = result.data.current;
        const newReading = {
          id: uuid.v1(),
          date: new Date().toLocaleString(),
          code: conversions.apiCode(reading.weather[0].id),
          temperature: reading.temp,
          windSpeed: reading.wind_speed,
          windDirection: reading.wind_deg,
          pressure: reading.pressure,
          tempTrend: [],
          trendLabels: [],
        };

        logger.debug("New reading = ", newReading);
        stationStore.addReading(stationId, newReading);
        response.redirect("/station/" + stationId);
      }
    } catch (error) {
      console.error(error);
    }
  },
  
};

module.exports = station;
