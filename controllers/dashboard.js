"use strict";
const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const stationStore = require("../models/stations-store");
const analytics = require("../utils/analytics");
const conversion = require("../utils/conversions.js");
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");

    const loggedInUser = accounts.getCurrentUser(request);
    const stations = stationStore.getUserStations(loggedInUser.id);
    stations.sort((a, b) => a.name.localeCompare(b.name));
    for (const station of stations) {
      const latestWeather = analytics.latestWeather(station);
      station.latestWeather = latestWeather;
    }

    const viewData = {
      title: "Weathertop Dashboard",
      stations: stations,
      user: loggedInUser,
    };
    logger.info("about to render", stationStore.getAllStations());
    response.render("dashboard", viewData);
  },

  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting Station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect("/dashboard");
  },

  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      name: request.body.name,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      newRead: {},
      readings: [],
    };
    stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },
  
};

module.exports = dashboard;
