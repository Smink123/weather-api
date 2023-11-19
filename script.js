const searchedArea = document.getElementById('searchLocation');
const submitLocation = document.getElementById('submitLocation');
const resultsArea = document.getElementById('weatherResults');

const weatherApiKey = '303a084ecffd4c6d868113603231311';

function search() {
    const weatherLocation = searchedArea.value;
    return weatherLocation;
}

submitLocation.addEventListener('click', function() {
    const weatherLocation = search();
    searchedArea.value = '';
    resultsArea.textContent = '';

    async function getWeather() {
        try {
            const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${weatherLocation}&aqi=no`, { mode: 'cors'})
            const weatherData = await response.json();

            console.log(weatherData);
            
            const resultLocation = document.createElement('p');
            resultLocation.textContent = weatherData.location.name;
            resultsArea.appendChild(resultLocation);

            const resultRegion = document.createElement('p');
            resultRegion.textContent = weatherData.location.region;
            resultsArea.appendChild(resultRegion);

            const resultCountry =  document.createElement('p');
            resultCountry.textContent = weatherData.location.country;
            resultsArea.appendChild(resultCountry);

            const localTime = document.createElement('p')
            localTime.textContent = weatherData.location.localtime;
            resultsArea.appendChild(localTime);

        } catch (error) {
            console.error('Error fetching weather data:', error);
            
        }
    }

    getWeather();
});
