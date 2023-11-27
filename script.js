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
const firstDaySummary = document.getElementById('dayOneDiv')
const secondDaySummary = document.querySelector("#forecastSection div:nth-child(2)");
const thirdDaySummary = document.querySelector("#forecastSection div:nth-child(3)");


document.addEventListener("DOMContentLoaded", function () {
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
    inputLabel.textContent = "enter location: ";
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
    thirdDaySummary.classList.remove('forecastSelect')
          secondDaySummary.classList.remove('forecastSelect')
      firstDaySummary.classList.remove('forecastSelect')


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
          displayData("p", city[key], townSide);
        }

        for (const key in time) {
          displayData("p", time[key], dateSide);
        }

        //current weather info:
        const latestWeather = currentTemperature(weatherData);

        const initialResults = document.createElement("div");
        initialResults.id = "initialResults";
        selectedWeatherSection.appendChild(initialResults);

        for (const key in latestWeather) {
          displayData("p", latestWeather[key], initialResults);
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

        function fadeInSelectedWeatherSection() {
          selectedWeatherSection.classList.remove("moving");
          void selectedWeatherSection.offsetWidth; // Trigger reflow to restart the animation
          selectedWeatherSection.classList.add("moving");
        }

        firstDaySummary.addEventListener("click", function () {
          secondDaySummary.classList.remove('forecastSelect')
          thirdDaySummary.classList.remove('forecastSelect')
          fadeInSelectedWeatherSection();
          showForecastData(dayOne, 0);
          firstDaySummary.classList.add('forecastSelect')
        });

        //GIVE SEPERATE CLASS, THEN REMOVE IT

        secondDaySummary.addEventListener("click", function () {
          firstDaySummary.classList.remove('forecastSelect')
          thirdDaySummary.classList.remove('forecastSelect')
          fadeInSelectedWeatherSection();
          showForecastData(dayTwo, 1);
          secondDaySummary.classList.add('forecastSelect')
        });

        thirdDaySummary.addEventListener("click", function () {
          firstDaySummary.classList.remove('forecastSelect')
          secondDaySummary.classList.remove('forecastSelect')
          fadeInSelectedWeatherSection();
          showForecastData(dayThree, 2);
          thirdDaySummary.classList.add('forecastSelect')
        });

        function showForecastData(obj, day) {
          selectedWeatherSection.textContent = "";
          selectedWeatherSection.style.flexDirection = "row";
          initialResults.style.display = "none";

          displayDataId("div", "", "resultsLeft", selectedWeatherSection);
          displayDataId("div", "", "resultsMiddle", selectedWeatherSection);
          displayDataId("div", "", "resultsRight", selectedWeatherSection);

          //left column
          displayDataId("p", "↓", "tempDownSymbol", resultsLeft);
          displayDataId("p", `${obj.minTempCelcius}°`, "minTemp", resultsLeft);

          //middle column
          displayDataId("p", "↑", "tempUpSymbol", resultsMiddle);
          displayDataId(
            "p",
            `${obj.maxTempCelcius}°`,
            "toname5",
            resultsMiddle
          );

          //right column
          displayDataClassId(
            "div",
            "",
            "line0",
            "forecastInfoLine",
            resultsRight
          );
          displayDataId("p", `forecast date: `, "forecastDate", line0);
          displayDataId("p", `${forecastDates(day)}`, "forecastDate2", line0);

          displayDataClassId(
            "div",
            "",
            "line1",
            "forecastInfoLine",
            resultsRight
          );
          displayDataId("p", `daily condition: `, "conditionHeader", line1);
          displayDataId("p", `${obj.condition}`, "conditionHeader2", line1);

          displayDataClassId(
            "div",
            "",
            "line2",
            "forecastInfoLine",
            resultsRight
          );
          displayDataId("p", `sunrise: `, "sunrise", line2);
          displayDataId("p", `${obj.sunrise}`, "sunrise2", line2);

          displayDataClassId(
            "div",
            "",
            "line3",
            "forecastInfoLine",
            resultsRight
          );
          displayDataId("p", `sunset: `, "sunset", line3);
          displayDataId("p", `${obj.sunset}`, "sunset2", line3);

          displayDataClassId(
            "div",
            "",
            "line4",
            "forecastInfoLine",
            resultsRight
          );
          displayDataId("p", `chance of rain: `, "rain", line4);
          displayDataId("p", `${obj.chanceOfRain}%`, "rain2", line4);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }

    getWeather();
  });
});

function search() {
  const weatherLocation = searchedArea.value;
  return weatherLocation;
}

function displayDataId(elementType, data, id, parentElement) {
  const element = document.createElement(elementType);
  element.textContent = data;
  element.id = id;
  parentElement.appendChild(element);
}

function displayDataClassId(elementType, data, id, className, parentElement) {
  const element = document.createElement(elementType);
  element.textContent = data;
  element.id = id;
  element.classList.add(className); // Use classList instead of class
  parentElement.appendChild(element);
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
    icon: api.forecast.forecastday[arrayNum].day.condition.icon,
    maxTempCelcius: `${api.forecast.forecastday[arrayNum].day.maxtemp_c}°`,
    minTempCelcius: `${api.forecast.forecastday[arrayNum].day.mintemp_c}°`,
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

function forecastDates(day) {
  const date = new Date();
  const specificDay = new Date(date);
  specificDay.setDate(date.getDate() + day);

  const editedDay = specificDay.toString().split(" ");
  return `${editedDay[0]} ${editedDay[2]} ${editedDay[1]}`;
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

//show forecast summary (bottom info)
function showSummaryInfo(object, parentElement, day = null) {
  //This means that if the day argument is not provided when calling the function, it will default to null
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
  displayData("p", day, parentElement);
  displayImage(object.icon, parentElement);
  displayData("p", `↑ ${object.maxTempCelcius}`, parentElement);
  displayData("p", `↓ ${object.minTempCelcius}`, parentElement);
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

//change background gradient depending on the temp
function tempBackground(objectTemp) {
  let backgroundChange;

  if (objectTemp < 2) {
    backgroundChange =
      "linear-gradient(0deg, rgba(0,0,0,1) 27%, rgba(0,60,237,1) 57%, rgba(66,165,255,1) 78%, rgba(55,255,254,1) 97%)";
  } else if (objectTemp >= 2 && objectTemp < 8) {
    backgroundChange =
      "linear-gradient(0deg, rgba(0,0,0,1) 27%, rgba(21,189,255,1) 57%, rgba(14,255,218,1) 78%, rgba(146,255,154,1) 97%)";
  } else if (objectTemp >= 8 && objectTemp < 15) {
    backgroundChange =
      "linear-gradient(0deg, rgba(0,0,0,1) 27%, rgba(21,244,255,1) 57%, rgba(14,255,23,1) 78%, rgba(217,255,91,1) 97%)";
  } else if (objectTemp >= 15 && objectTemp < 24) {
    backgroundChange =
      "linear-gradient(0deg, rgba(0,0,0,1) 27%, rgba(21,255,195,1) 57%, rgba(90,255,14,1) 78%, rgba(206,255,8,1) 97%)";
  } else if (objectTemp >= 24 && objectTemp < 31) {
    backgroundChange =
      "linear-gradient(0deg, rgba(0,0,0,1) 27%, rgba(255,117,21,1) 57%, rgba(255,210,14,1) 78%, rgba(255,250,8,1) 97%)";
  } else if (objectTemp >= 31 && objectTemp < 38) {
    backgroundChange =
      "linear-gradient(0deg, rgba(0,0,0,1) 27%, rgba(255,69,21,1) 57%, rgba(255,133,14,1) 78%, rgba(255,220,0,1) 97%)";
  } else {
    backgroundChange =
      "linear-gradient(0deg, rgba(0,0,0,1) 27%, rgba(138,0,0,1) 57%, rgba(255,66,66,1) 78%, rgba(255,154,55,1) 97%)";
  }

  return (resultsArea.style.background = backgroundChange);
}

//impliment function to convert the image src obtained by the original weatherData object to own custom icons.
//Do this by using this link: https://www.weatherapi.com/docs/weather_conditions.json

//e.g. if weatherData.condition === 'Light snow showers' {
//  img.src = own custom link (sbsoloute link)

//impliment function to convert the image src obtained by the original weatherData object to own custom icons.
//Do this by using this link: https://www.weatherapi.com/docs/weather_conditions.json

//e.g. if weatherData.condition === 'Light snow showers' {
//  img.src = own custom link (sbsoloute link)

//for errors, show the message in the object retrieved (i.e. No matching location found.)
