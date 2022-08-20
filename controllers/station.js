"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/stations-store.js");
const uuid = require("uuid");
const analytics = require("../utils/analytics");
const conversions = require("../utils/conversions");

const station = {
  index(request, response) {
    const stationId = request.params.id;

    const station = stationStore.getStation(stationId);

    const latestWeather = analytics.latestWeather(station);

    const viewData = {
      title: "Station",
      station: station,
      latestWeather: latestWeather,
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
    let timestamp = new Date().getTime(); //generates unix timestamp
    let date = new Date(timestamp);

    const newReading = {
      id: uuid.v1(),
      code: request.body.code,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      windDirection: request.body.windDirection,
      pressure: request.body.pressure,
      date: date.toGMTString(), //reads GMT (1 HOUR BEHIND!) LocaleDateString does the same as does all other functions
    };
    stationStore.addReading(stationId, newReading);
    response.redirect("/station/" + stationId);
  },
};

module.exports = station;
