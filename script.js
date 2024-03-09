import {
  landingGreeting,
  timeAndDate,
  forecastDates,
} from "./timeDateFunctions.js";
import { displayImage, displayingData } from "./displayingDataFunctions.js";
import {
  dailyForecastSummary,
  dailyForecast,
  locationInfo,
} from "./apiObjects.js";
import { tempBackground } from "./visualFunctions.js";

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
const forecastSection = document.getElementById("forecastSection");
const locationSection = document.getElementById("locationSection");
const firstDaySummary = document.getElementById("dayOneDiv");
const secondDaySummary = document.querySelector(
  "#forecastSection div:nth-child(2)"
);
const thirdDaySummary = document.querySelector(
  "#forecastSection div:nth-child(3)"
);
const errorMessage = document.getElementById("errorMessage");

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
  landingPage.style.padding = "0px";
  searchedArea.style.marginTop = "0px";
  searchedArea.placeholder = "enter location";
  searchBarArea.classList.add("searchBarAfter");

  const elementsToFade = [
    dateSide,
    townSide,
    selectedWeatherSection,
    forecastSection,
    resultsArea,
  ];

  function addClass(element) {
    element.classList.remove("moving");
    void element.offsetWidth;
    element.classList.add("moving");
  }
  elementsToFade.forEach((item) => addClass(item));

  resultsArea.style.display = "flex";
  inputLabel.textContent = "";
  greeting.textContent = "";

  //Reset results on search:
  const weatherLocation = search();
  searchedArea.value = "";
  townSide.textContent = "";
  dateSide.textContent = "";
  selectedWeatherSection.textContent = "";
  firstDaySummary.textContent = "";
  secondDaySummary.textContent = "";
  thirdDaySummary.textContent = "";
  errorMessage.textContent = "";
  errorMessage.style.paddingBottom = "0px";
  thirdDaySummary.classList.remove("forecastSelect");
  secondDaySummary.classList.remove("forecastSelect");
  firstDaySummary.classList.remove("forecastSelect");

  async function getWeather() {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${weatherLocation}&days=3&aqi=no&alerts=no`,
        { mode: "cors" }
      );
      const weatherData = await response.json();
      console.log(weatherData);

      tempBackground(weatherData.current.temp_c);

      //objects for necessary info:

      //location info
      const city = locationInfo(weatherData);
      const time = timeAndDate();

      for (const key in city) {
        displayingData("p", city[key], "", "", townSide);
      }

      for (const key in time) {
        displayingData("p", time[key], "", "", dateSide);
      }

      //current weather info:
      const latestWeather = currentTemperature(weatherData);

      const initialResults = document.createElement("div");
      initialResults.id = "initialResults";
      selectedWeatherSection.appendChild(initialResults);

      for (const key in latestWeather) {
        displayingData("p", latestWeather[key], "", "", initialResults);
      }

      //3 day forecast summary
      const oneSummary = dailyForecastSummary(weatherData, 0);
      const twoSummary = dailyForecastSummary(weatherData, 1);
      const threeSummary = dailyForecastSummary(weatherData, 2);

      showSummaryInfo(oneSummary, firstDaySummary, "Today");
      showSummaryInfo(twoSummary, secondDaySummary, "Tomorrow");
      showSummaryInfo(threeSummary, thirdDaySummary);

      //3 day forecast full
      const dayOne = dailyForecast(weatherData, 0);
      const dayTwo = dailyForecast(weatherData, 1);
      const dayThree = dailyForecast(weatherData, 2);

      firstDaySummary.addEventListener("click", function () {
        secondDaySummary.classList.remove("forecastSelect");
        thirdDaySummary.classList.remove("forecastSelect");
        fadeInSelectedWeatherSection();
        showForecastData(dayOne, 0);
        firstDaySummary.classList.add("forecastSelect");
      });

      secondDaySummary.addEventListener("click", function () {
        firstDaySummary.classList.remove("forecastSelect");
        thirdDaySummary.classList.remove("forecastSelect");
        fadeInSelectedWeatherSection();
        showForecastData(dayTwo, 1);
        secondDaySummary.classList.add("forecastSelect");
      });

      thirdDaySummary.addEventListener("click", function () {
        firstDaySummary.classList.remove("forecastSelect");
        secondDaySummary.classList.remove("forecastSelect");
        fadeInSelectedWeatherSection();
        showForecastData(dayThree, 2);
        thirdDaySummary.classList.add("forecastSelect");
      });

      function showForecastData(obj, day) {
        selectedWeatherSection.textContent = "";
        selectedWeatherSection.style.flexDirection = "row";
        initialResults.style.display = "none";

        displayingData("div", "", "resultsLeft", "", selectedWeatherSection);
        displayingData("div", "", "resultsMiddle", "", selectedWeatherSection);
        displayingData("div", "", "resultsRight", "", selectedWeatherSection);

        //left column
        displayingData("p", "↓", "tempDownSymbol", "", resultsLeft);
        displayingData(
          "p",
          `${obj.minTempCelcius}°`,
          "minTemp",
          "",
          resultsLeft
        );

        //middle column
        displayingData("p", "↑", "tempUpSymbol", "", resultsMiddle);
        displayingData(
          "p",
          `${obj.maxTempCelcius}°`,
          "toname5",
          "",
          resultsMiddle
        );

        //right column
        displayingData("div", "", "line0", "forecastInfoLine", resultsRight);
        displayingData("p", `forecast date: `, "forecastDate", "", line0);
        displayingData(
          "p",
          `${forecastDates(day)}`,
          "forecastDate2",
          "",
          line0
        );

        displayingData("div", "", "line1", "forecastInfoLine", resultsRight);
        displayingData("p", `daily condition: `, "conditionHeader", "", line1);
        displayingData("p", `${obj.condition}`, "conditionHeader2", "", line1);

        displayingData("div", "", "line2", "forecastInfoLine", resultsRight);
        displayingData("p", `sunrise: `, "sunrise", "", line2);
        displayingData("p", `${obj.sunrise}`, "sunrise2", "", line2);

        displayingData("div", "", "line3", "forecastInfoLine", resultsRight);
        displayingData("p", `sunset: `, "sunset", "", line3);
        displayingData("p", `${obj.sunset}`, "sunset2", "", line3);

        displayingData("div", "", "line4", "forecastInfoLine", resultsRight);
        displayingData("p", `chance of rain: `, "rain", "", line4);
        displayingData("p", `${obj.chanceOfRain}%`, "rain2", "", line4);
      }
    } catch (error) {
      console.error("Hello. error fetching weather data:", error);
      errorMessage.textContent =
        "ERROR:\nPlease check your location and try again.";
      errorMessage.style.whiteSpace = "pre-line";
      errorMessage.style.fontSize = "1.5rem";
      errorMessage.style.color = "#ff2424";
      errorMessage.style.padding = "0px 25px 20px 25px";
      landingPage.style.background = "none";
      resultsArea.style.background = "none";
    }
  }
  getWeather();
});

function search() {
  const weatherLocation = searchedArea.value;
  return weatherLocation;
}

function currentTemperature(api) {
  const currentTemp = {
    currentCelcius: `${api.current.temp_c}°`,
    currentHeader: "current temperature",
    feelsLikeCelcius: `feels like ${api.current.feelslike_c}°`,
  };
  return currentTemp;
}

function fadeInSelectedWeatherSection() {
  selectedWeatherSection.classList.remove("moving");
  void selectedWeatherSection.offsetWidth;
  selectedWeatherSection.classList.add("moving");
}

function showSummaryInfo(object, parentElement, day = null) {
  if (day === null) {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date();
    const twoDaysFromNow = new Date(today);
    twoDaysFromNow.setDate(today.getDate() + 2);
    day = weekday[twoDaysFromNow.getDay()];
  }
  displayingData("p", day, "", "", parentElement);
  displayImage(object.icon, parentElement);
  displayingData("p", `↑ ${object.maxTempCelcius}`, "", "", parentElement);
  displayingData("p", `↓ ${object.minTempCelcius}`, "", "", parentElement);
}
