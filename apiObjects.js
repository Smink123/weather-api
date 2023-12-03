
export function dailyForecastSummary(api, arrayNum) {
    const daySummary = {
      icon: api.forecast.forecastday[arrayNum].day.condition.icon,
      maxTempCelcius: `${api.forecast.forecastday[arrayNum].day.maxtemp_c}°`,
      minTempCelcius: `${api.forecast.forecastday[arrayNum].day.mintemp_c}°`,
    };
    return daySummary;
  }
  
  export function dailyForecast(api, arrayNum) {
    const day = {
      icon: api.forecast.forecastday[arrayNum].day.condition.icon,
      condition: api.forecast.forecastday[arrayNum].day.condition.text,
      date: api.forecast.forecastday[arrayNum].date,
      sunrise: api.forecast.forecastday[arrayNum].astro.sunrise,
      sunset: api.forecast.forecastday[arrayNum].astro.sunset,
      maxTempCelcius: api.forecast.forecastday[arrayNum].day.maxtemp_c,
      maxTempFarenheight: api.forecast.forecastday[arrayNum].day.maxtemp_f,
      minTempCelcius: api.forecast.forecastday[arrayNum].day.mintemp_c,
      minTempFarenheight: api.forecast.forecastday[arrayNum].day.mintemp_f,
      chanceOfRain: api.forecast.forecastday[arrayNum].day.daily_chance_of_rain,
    };
    return day;
  }
  
  export function locationInfo(api) {
    const areaInfo = {
      city: api.location.name,
      region: api.location.region,
      country: api.location.country,
    };
    return areaInfo;
  }