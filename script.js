//create specific objects and loop through them to display them
const landingPage = document.getElementById("searchAreaLarge");
const searchedArea = document.getElementById("searchLocation");
const submitLocation = document.getElementById("submitLocation");
const resultsArea = document.getElementById("weatherResults");
const searchBarArea = document.getElementById("searchArea");
const greeting = document.querySelector("#searchAreaLarge p");
const inputLabel = document.querySelector("#searchArea label");

const weatherApiKey = "303a084ecffd4c6d868113603231311";

resultsArea.style.display = 'none'

greeting.textContent = landingGreeting();

submitLocation.addEventListener("click", function () {
  //change structure of page:
  inputLabel.style.fontSize = '1.5rem'
  submitLocation.style.fontSize = '1.5rem'
  searchedArea.style.fontSize = '1.5rem'
  searchedArea.style.height = 'auto'
  landingPage.style.height = "auto";
  searchBarArea.classList.add("searchBarAfter");
  resultsArea.style.display = 'flex'
  inputLabel.textContent = "enter location: ";
  greeting.textContent = "";

  //Reset results:
  const weatherLocation = search();
  searchedArea.value = "";
  /*resultsArea.textContent = "";*/

  async function getWeather() {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${weatherLocation}&days=3&aqi=no&alerts=no`,
        { mode: "cors" }
      );
      const weatherData = await response.json();
      console.log(weatherData);

      //objects for necessary info:

      //current weather info:
      const latestWeather = currentTemperature(weatherData);
      //location info
      const city = locationInfo(weatherData);

      //3 day forecast
      const dayOne = dailyForecast(weatherData, 0);
      const dayTwo = dailyForecast(weatherData, 1);
      const dayThree = dailyForecast(weatherData, 2);
      console.log(dayOne);
      console.log(dayTwo);
      console.log(dayThree);
      console.log(latestWeather);
      console.log(city);

    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  getWeather();
});

function search() {
  const weatherLocation = searchedArea.value;
  return weatherLocation;
}

function displayData(elementType, data, parentElement, idName) {
  const element = document.createElement(elementType);
  element.textContent = data;
  element.setAttribute("id", idName);
  parentElement.appendChild(element);
}

function displayImage(imageData, imageParentElement, idName) {
  const imageElement = document.createElement("img");
  const imageLink = imageData;
  imageElement.src = imageLink;
  imageElement.setAttribute("id", idName);
  imageParentElement.appendChild(imageElement);
}

function dailyForecast(api, arrayNum) {
  const day = {
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

function locationInfo(api) {
  const areaInfo = {
    city: api.location.name,
    region: api.location.region,
    country: api.location.country,
    time: api.location.localtime,
  };
  return areaInfo;
}

function currentTemperature(api) {
  const currentTemp = {
    currentCelcius: api.current.temp_c,
    currentFarenheight: api.current.temp_f,
    feelsLikeCelcius: api.current.feelslike_c,
    feelsLikeFarenheight: api.current.feelslike_f,
  };
  return currentTemp;
}

function landingGreeting() {
  const d = new Date();
  let hour = d.getHours();

  if (hour >= 0 && hour < 12) {
    return "good morning!";
  } else if (hour >= 12 && hour < 17) {
    return "good afternoon!";
  } else {
    return "good evening!";
  }
}

//impliment function to convert the image src obtained by the original weatherData object to own custom icons.
//Do this by using this link: https://www.weatherapi.com/docs/weather_conditions.json

//e.g. if weatherData.condition === 'Light snow showers' {
//  img.src = own custom link (sbsoloute link)
