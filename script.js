//create specific objects and loop through them to display them
const landingPage = document.getElementById("searchAreaLarge");
const searchedArea = document.getElementById("searchLocation");
const submitLocation = document.getElementById("submitLocation");
const resultsArea = document.getElementById("weatherResults");
const searchBarArea = document.getElementById("searchArea");
const greeting = document.querySelector("#searchAreaLarge p");
const inputLabel = document.querySelector("#searchArea label");
const townSide = document.getElementById("townSide");
const dateSide = document.getElementById("dateSide");
const selectedWeatherSection = document.getElementById("weatherSection");
const firstDaySummary = document.querySelector("#forecastSection div:nth-child(1)");
const secondDaySummary = document.querySelector("#forecastSection div:nth-child(2)");
const thirdDaySummary = document.querySelector("#forecastSection div:nth-child(3)");

const weatherApiKey = "303a084ecffd4c6d868113603231311";

resultsArea.style.display = "none";

greeting.textContent = landingGreeting();

submitLocation.addEventListener("click", function () {
  //change structure of page:
  inputLabel.style.fontSize = "1.5rem";
  submitLocation.style.fontSize = "1.5rem";
  searchedArea.style.fontSize = "1.5rem";
  searchedArea.style.height = "auto";
  landingPage.style.height = "auto";
  searchBarArea.classList.add("searchBarAfter");
  resultsArea.style.display = "flex";
  inputLabel.textContent = "enter location: ";
  greeting.textContent = "";

  //Reset results on search:
  const weatherLocation = search();
  searchedArea.value = "";
  townSide.textContent = '';
  dateSide.textContent = '';
  selectedWeatherSection.textContent = '';
  firstDaySummary.textContent = '';
  secondDaySummary.textContent = '';
  thirdDaySummary.textContent = '';


  async function getWeather() {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${weatherLocation}&days=3&aqi=no&alerts=no`,
        { mode: "cors" }
      );
      const weatherData = await response.json();
      console.log(weatherData);

      //objects for necessary info:

      //location info
      const city = locationInfo(weatherData);
      const time = timeAndDate();

      for (const key in city) {
        displayData("p", city[key], townSide);
      }

      for (const key in time) {
        displayData("p", time[key], dateSide);
      }

      //current weather info:
      const latestWeather = currentTemperature(weatherData);

      for (const key in latestWeather) {
        displayData("p", latestWeather[key], selectedWeatherSection);
      }

      //3 day forecast summary
      const oneSummary = dailyForecastSummary(weatherData, 0);
      const twoSummary = dailyForecastSummary(weatherData, 1);
      const threeSummary = dailyForecastSummary(weatherData, 2);

      showSummaryInfo(oneSummary, firstDaySummary)
      showSummaryInfo(twoSummary, secondDaySummary)
      showSummaryInfo(threeSummary, thirdDaySummary)


      //3 day forecast full
      const dayOne = dailyForecast(weatherData, 0);
      const dayTwo = dailyForecast(weatherData, 1);
      const dayThree = dailyForecast(weatherData, 2);
      /*
      console.log(dayOne);
      console.log(dayTwo);
      console.log(dayThree);*/
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

function displayData(elementType, data, parentElement) {
  const element = document.createElement(elementType);
  element.textContent = data;
  parentElement.appendChild(element);
}

function displayImage(imageData, imageParentElement) {
  const imageElement = document.createElement("img");
  const imageLink = imageData;
  imageElement.src = imageLink;
  imageParentElement.appendChild(imageElement);
}

function dailyForecastSummary(api, arrayNum) {
  const daySummary = {
    date: api.forecast.forecastday[arrayNum].date,
    icon: api.forecast.forecastday[arrayNum].day.condition.icon,
    maxTempCelcius: api.forecast.forecastday[arrayNum].day.maxtemp_c,
    minTempCelcius: api.forecast.forecastday[arrayNum].day.mintemp_c,
  };
  return daySummary;
}

function dailyForecast(api, arrayNum) {
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

function locationInfo(api) {
  const areaInfo = {
    city: api.location.name,
    region: api.location.region,
    country: api.location.country,
  };
  return areaInfo;
}

function timeAndDate() {
  let today = new Date();
  let todayArray = today.toString().split(" ").slice(0, 5);
  let editedTime = todayArray[4].substring(0, todayArray[4].length - 3);

  const timeObject = {
    currentTime: editedTime,
    currentDate: `${todayArray[0]} ${todayArray[2]} ${todayArray[1]}`,
    currentYear: todayArray[3],
  };
  return timeObject;
}

function showSummaryInfo(object, parentElement) {
  displayData("p", object.date, parentElement);
  displayImage(object.icon, parentElement);
  displayData("p", object.minTempCelcius, parentElement);
  displayData("p", object.maxTempCelcius, parentElement);
}

function currentTemperature(api) {
  const currentTemp = {
    currentCelcius: `${api.current.temp_c}°`,
    currentHeader: "current temperature",
    feelsLikeCelcius: `feels like ${api.current.feelslike_c}°`,
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
