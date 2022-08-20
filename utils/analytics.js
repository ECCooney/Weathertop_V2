"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/stations-store.js");
const conversion = require("./conversions.js");
const trends = require("./trends.js");

const analytics = {
  latestWeather(station) {
    if (station.readings.length > 0) {
      const lastReading = station.readings[station.readings.length - 1];
      const tempF = conversion.tempF(lastReading.temperature);
      const beaufort = conversion.beaufort(lastReading.windSpeed);
      const pressure = lastReading.pressure;
      const temperature = lastReading.temperature;
      const code = lastReading.code;
      const conditions = conversion.weatherConditions(lastReading.code);
      const minWind = analytics.minWind(station.readings);
      const maxWind = analytics.maxWind(station.readings);
      const minTemp = analytics.minTemp(station.readings);
      const maxTemp = analytics.maxTemp(station.readings);
      const minPressure = analytics.minPressure(station.readings);
      const maxPressure = analytics.maxPressure(station.readings);
      const weatherIcon = conversion.weatherIcon(lastReading.code);
      const tempTrend = trends.tempTrends(station.readings);
      const windTrend = trends.windTrends(station.readings);
      const pressureTrend = trends.pressureTrends(station.readings);
      const windCompass = conversion.windDirect(
        lastReading.windDirection
      );
      const windChill = analytics.windChill(
        lastReading.temperature,
        lastReading.windSpeed
      );
      var latestWeather = {
        code, temperature, pressure, tempF, beaufort, windCompass,
        windChill, conditions, minWind, maxWind, minTemp, maxTemp, minPressure, maxPressure,
        weatherIcon, tempTrend, windTrend, pressureTrend
      };
    }
    return latestWeather;
  },

  windChill(temp, windspeed) {
    let windChill = 13.12 + 0.6215 * temp - 11.37 * (Math.pow(windspeed, 0.16)) + 0.3965 * temp * (Math.pow(windspeed, 0.16));
    return windChill.toFixed(2);
  },

  minWind(readings) {
    let minReading = readings[0];
    for (const reading of readings) {
      if (reading.windSpeed < minReading.windSpeed) {
        minReading = reading;
      }
    }
    return minReading.windSpeed;
  },

  maxWind(readings) {
    let maxReading = readings[0];
    for (const reading of readings) {
      if (reading.windSpeed > maxReading.windSpeed) {
        maxReading = reading;
      }
    }
    return maxReading.windSpeed;
  },

  minTemp(readings) {
    let minReading = readings[0];
    for (const reading of readings) {
      if (reading.temperature < minReading.temperature) {
        minReading = reading;
      }
    }
    return minReading.temperature;
  },

  maxTemp(readings) {
    let maxReading = readings[0];
    for (const reading of readings) {
      if (reading.temperature > maxReading.temperature) {
        maxReading = reading;
      }
    }
    return maxReading.temperature;
  },

  minPressure(readings) {
    let minReading = readings[0];
    for (const reading of readings) {
      if (reading.pressure < minReading.pressure) {
        minReading = reading;
      }
    }
    return minReading.pressure;
  },

  maxPressure(readings) {
    let maxReading = readings[0];
    for (const reading of readings) {
      if (reading.pressure > maxReading.pressure) {
        maxReading = reading;
      }
    }
    return maxReading.pressure;
  },

};

module.exports = analytics;