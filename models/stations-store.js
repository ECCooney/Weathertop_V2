"use strict";

const _ = require("lodash");

const stationStore = {
  stationCollection: require("./stations-store.json").stationCollection,

  getAllStations() {
    return this.stationCollection;
  },

  getStation(id) {
    return _.find(this.stationCollection, { id: id });
  },

  removeStation(id) {
    _.remove(this.stationCollection, { id: id });
  },

  removeReading(id, readingId) {
    const station = this.getStation(id);
    _.remove(station.readings, { id: readingId });
  },

  addReading(id, reading) {
    const station = this.getStation(id);
    station.readings.push(reading);
  },

  addStation(station) {
    this.stationCollection.push(station);
  },

  updateWeather(id) {
    const station = this.getStation(id);
    let latestWeather = null;
    if (station.readings.length > 0) {
      latestWeather = station.readings[station.readings.length - 1];
    }
    return latestWeather;
  },
};

module.exports = stationStore;
