"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/stations-store.js");

const trends = {
  
  tempTrends(readings) {
    let temTrends = null;
    if (readings.length > 2) {
      let readingA = readings[readings.length - 1];
      let readingB = readings[readings.length - 2];
      let readingC = readings[readings.length - 3];
      if (readingA.temperature > readingB.temperature &&
          readingB.temperature > readingC.temperature) {
        temTrends = "big arrow up icon";
      } else if ((readingA.temperature < readingB.temperature &&
          readingB.temperature < readingC.temperature)) {
        temTrends = "big arrow down icon";
      } else temTrends = "big exchange icon";
    }
    return temTrends;
  },

  windTrends(readings) {
    let winTrends = null;
    if (readings.length > 2) {
      let readingA = readings[readings.length - 1];
      let readingB = readings[readings.length - 2];
      let readingC = readings[readings.length - 3];
      if (readingA.windSpeed > readingB.windSpeed &&
          readingB.windSpeed > readingC.windSpeed) {
        winTrends = "big arrow up icon";
      } else if ((readingA.windSpeed < readingB.windSpeed &&
          readingB.windSpeed < readingC.windSpeed)) {
        winTrends = "big arrow down icon";
      } else winTrends = "big exchange icon";
    }
    return winTrends;
  },

  pressureTrends(readings) {
    let pressTrends = null;
    if (readings.length > 2) {
      let readingA = readings[readings.length - 1];
      let readingB = readings[readings.length - 2];
      let readingC = readings[readings.length - 3];
      if (readingA.pressure > readingB.pressure &&
          readingB.pressure > readingC.pressure) {
        pressTrends = "big arrow up icon";
      } else if ((readingA.pressure < readingB.pressure &&
          readingB.pressure < readingC.pressure)) {
        pressTrends = "big arrow down icon";
      } else pressTrends = "big exchange icon";
    }
    return pressTrends;
  }
}

module.exports = trends;
