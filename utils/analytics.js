"use strict";

const readingAnalytics = {
  
  updateWeather(station){
    let latestWeather = null;
    if(station.readings.length > 0){
      latestWeather = station.readings[station.readings.length - 1];
    }
    return latestWeather;
  }
  
}
  
module.exports = readingAnalytics;