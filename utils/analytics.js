"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/stations-store.js");
const conversion = require("./conversions.js");

const analytics = {
  latestWeather(station) {
    if (station.readings.length > 0) {
      const lastReading = station.readings[station.readings.length - 1];
      const tempFarenheit = conversion.tempF(lastReading.temperature);
      const beaufort = conversion.beaufort(lastReading.windSpeed);
      const pressure = lastReading.pressure;
      const temperature = lastReading.temperature;
      const code = lastReading.code;
      const compassDirection = conversion.degreesToCompass(
        lastReading.windDirection
      );
      const windChill = analytics.windChill(
        lastReading.temperature,
        lastReading.windSpeed
      );
      const conditions = conversion.codeToWeatherConditions(lastReading.code);
      const minWindSpeed = analytics.minWindSpeed(station.readings);
      const maxWindSpeed = analytics.maxWindSpeed(station.readings);
      const minTemp = analytics.minTemp(station.readings);
      const maxTemp = analytics.maxTemp(station.readings);
      const minPressure = analytics.minPressure(station.readings);
      const maxPressure = analytics.maxPressure(station.readings);
      const weatherIcon = conversion.codeToIcon(lastReading.code);
      const tempTrend = analytics.tempTrend(station.readings);
      const windTrend = analytics.windTrend(station.readings);
      const pressureTrend = analytics.pressureTrend(station.readings);
      var latestWeather = {
        tempFarenheit, beaufort, pressure, temperature, code, compassDirection,
        windChill, conditions, minWindSpeed, maxWindSpeed, minTemp, maxTemp, minPressure, maxPressure,
        weatherIcon, tempTrend, windTrend, pressureTrend
      };
    }
    return latestWeather;
  },

  windChill(temp, windspeed) {
    let windChill = 13.12 + 0.6215 * temp - 11.37 * (Math.pow(windspeed, 0.16)) + 0.3965 * temp * (Math.pow(windspeed, 0.16));
    return windChill.toFixed(2);
  },

  minWindSpeed(readings) {
    let minReading = readings[0];
    for (const reading of readings) {
      if (reading.windSpeed < minReading.windSpeed) {
        minReading = reading;
      }
    }
    return minReading.windSpeed;
  },

  maxWindSpeed(readings) {
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

  tempTrend(readings) {
    let trend = 0;
    if (readings.length > 2) {
      let values = [readings[readings.length - 3].temperature, readings[readings.length - 2].temperature, readings[readings.length - 1].temperature];
      trend = this.calcTrend(values);
    }
    return trend;
  },

  windTrend(readings) {
    let trend = 0;
    if (readings.length > 2) {
      let values = [readings[readings.length - 3].windSpeed, readings[readings.length - 2].windSpeed, readings[readings.length - 1].windSpeed];
      trend = this.calcTrend(values);
    }
    return trend;
  },

  pressureTrend(readings) {
    let trend = 0;
    if (readings.length > 2) {
      let values = [readings[readings.length - 3].pressure, readings[readings.length - 2].pressure, readings[readings.length - 1].pressure];
      trend = this.calcTrend(values);
    }
    return trend;
  },

  calcTrend(values) {
    let trend = "";
    if (values.length > 2) {
      if ((values[2] > values[1]) && (values[1] > values[0])) {
        trend = "arrow up";
      } else if ((values[2] < values[1]) && (values[1] < values[0])) {
        trend = "arrow down";
      }
    }
    return trend;
  }

};

module.exports = analytics;