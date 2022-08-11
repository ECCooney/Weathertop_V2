"use strict";

const logger = require("../utils/logger");
const stationCollection = require('../models/stations-store.js');
const analytics = require('../utils/analytics')
const uuid = require('uuid');

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    
    const stationId = request.params.id;
    const station = stationCollection.getStation(stationId);

    
    const viewData = {
      title: "Weathertop Dashboard",
      stations: stationCollection.getAllStations(),
    };
    logger.info('about to render', stationCollection);
    response.render("dashboard", viewData);
  },
  
  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting Station ${stationId}`);
    stationCollection.removeStation(stationId);
    response.redirect('/dashboard');
  },
  
  addStation(request, response){
    const newStation = {
      id: uuid.v1(),
      title: request.body.title,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      readings:[],
    };
    stationCollection.addStation(newStation);
    response.redirect('/dashboard');
  }
};

module.exports = dashboard;
