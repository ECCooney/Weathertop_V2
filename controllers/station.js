'use strict';

const logger = require('../utils/logger');
const stationStore = require('../models/stations-store.js');
const analytics = require('../utils/analytics');
const uuid = require('uuid');

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug('Station id =', stationId);
    
    const station = stationStore.getStation(stationId);
    const latestWeather = analytics.updateWeather(station);
    
    const viewData = {
      title: 'Station',
      station: stationStore.getStation(stationId),
      latestWeather: latestWeather
    };
    response.render('station', viewData);
  },   
  
  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting reading ${readingId} from Station ${stationId}`);
    stationStore.removeReading (stationId, readingId);
    response.redirect('/station/' + stationId);
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
    };
    stationStore.addReading(stationId, newReading);
    response.redirect('/station/' + stationId);
  },
};

module.exports = station;