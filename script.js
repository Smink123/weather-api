const searchedArea = document.getElementById('searchLocation');
const submitLocation = document.getElementById('submitLocation');
const resultsArea = document.getElementById('weatherResults')

const weatherApiKey = '303a084ecffd4c6d868113603231311';

function search() {
    const weatherLocation = searchedArea.value;
    return weatherLocation;
}

submitLocation.addEventListener('click', function() {
    const weatherLocation = search();
    searchedArea.value = '';

    const locationHeader = document.createElement('h2');
    locationHeader.textContent = weatherLocation;
    resultsArea.appendChild(locationHeader);

})