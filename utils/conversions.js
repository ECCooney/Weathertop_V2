"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/stations-store.js");

const conversion = {
  tempF(tempC) {
    let tempF = tempC * 1.8 + 32;
    return tempF.toFixed(2);
  },

  beaufort(windSpeed) {
    let beauf = 0;
    if (windSpeed > 1 && windSpeed <= 5) {
      beauf = 1;
    } else if (windSpeed > 5 && windSpeed <= 11) {
      beauf = 2;
    } else if (windSpeed > 11 && windSpeed <= 19) {
      beauf = 3;
    } else if (windSpeed > 19 && windSpeed <= 28) {
      beauf = 4;
    } else if (windSpeed > 28 && windSpeed <= 38) {
      beauf = 5;
    } else if (windSpeed > 38 && windSpeed <= 49) {
      beauf = 6;
    } else if (windSpeed > 49 && windSpeed <= 61) {
      beauf = 7;
    } else if (windSpeed > 61 && windSpeed <= 74) {
      beauf = 8;
    } else if (windSpeed > 74 && windSpeed <= 88) {
      beauf = 9;
    } else if (windSpeed > 88 && windSpeed <= 102) {
      beauf = 10;
    } else if (windSpeed > 102 && windSpeed <= 117) {
      beauf = 11;
    }
    return beauf;
  },

  windDirect(windDirection) {
    let direction = null;
    if (
      (windDirection >= 347.75 && windDirection <= 360.0) ||
      windDirection < 11.25
    ) {
      direction = "North";
    } else if (windDirection >= 11.25 && windDirection < 33.75) {
      direction = "North North East";
    } else if (windDirection >= 33.75 && windDirection < 56.25) {
      direction = "North East";
    } else if (windDirection >= 56.25 && windDirection < 78.75) {
      direction = "East North East";
    } else if (windDirection >= 78.75 && windDirection < 101.25) {
      direction = "East";
    } else if (windDirection >= 101.25 && windDirection < 123.75) {
      direction = "East South East";
    } else if (windDirection >= 123.75 && windDirection < 146.25) {
      direction = "South East";
    } else if (windDirection >= 146.25 && windDirection < 168.75) {
      direction = "South South East";
    } else if (windDirection >= 168.75 && windDirection < 191.25) {
      direction = "South";
    } else if (windDirection >= 191.25 && windDirection < 213.75) {
      direction = "South South West";
    } else if (windDirection >= 213.75 && windDirection < 236.25) {
      direction = "South West";
    } else if (windDirection >= 236.25 && windDirection < 258.75) {
      direction = "West South West";
    } else if (windDirection >= 258.75 && windDirection < 281.25) {
      direction = "West";
    } else if (windDirection >= 281.25 && windDirection < 303.75) {
      direction = "West North West";
    } else if (windDirection >= 303.75 && windDirection < 326.25) {
      direction = "North West";
    } else if (windDirection >= 326.25 && windDirection < 348.75) {
      direction = "North North West";
    } else {
      direction = "Wind Direction not Available";
    }
    return direction;
  },

  weatherConditions(code) {
    let conditions = null;
    switch (code) {
      case 100:
        conditions = "Clear";
        break;
      case 200:
        conditions = "Partial Clouds";
        break;
      case 300:
        conditions = "Cloudy";
        break;
      case 400:
        conditions = "Light Showers";
        break;
      case 500:
        conditions = "Heavy Showers";
        break;
      case 600:
        conditions = "Rain";
        break;
      case 700:
        conditions = "Snow";
        break;
      case 800:
        conditions = "Thunder";
        break;
      default:
        conditions = "No Current Valid Reading";
        break;
    }
    return conditions;
  },

  weatherIcon(code) {
    let icon = null;
    switch (code) {
      case 100:
        icon = "big sun icon";
        break;
      case 200:
        icon = "big cloud sun icon";
        break;
      case 300:
        icon = "big cloud icon";
        break;
      case 400:
        icon = "big cloud sun rain icon";
        break;
      case 500:
        icon = "big cloud showers heavy icon";
        break;
      case 600:
        icon = "big cloud rain icon";
        break;
      case 700:
        icon = "big snowflake icon";
        break;
      case 800:
        icon = "big bolt icon";
        break;
      default:
        icon = "big times icon";
        break;
    }
    return icon;
  },
};

module.exports = conversion;
