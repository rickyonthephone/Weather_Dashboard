//Declaration of variables for form input
var userFormEl = document.getElementById("user-form")
var userCityNameEl = document.getElementById("city-name")
var searchBtnEl = document.getElementById("searchBtn")
var citySelect = userCityNameEl.value.trim();

//Prevent default on seach button
function searchCity (searchEvent) {
    searchEvent.preventDefault();
    //Get city name from form input
    var citySelect = userCityNameEl.value.trim();
    
    // console.log("The city you selected is " + citySelect);

    if(citySelect) {
        getUserWeather(citySelect);
        console.log("I have city " + citySelect);
    }else {
        alert('City name is required to search.')
    }

}

function getUserWeather(name) {
    console.log('Searching for city ' + name);

//Take above parameter to build URL string

var apiURL = 'http://api.openweathermap.org/data/2.5/weather?q='+name+'&appid=0642f62247cd5fc4b4b2603fcde8ec95';
//API request 

fetch(apiURL)
    .then(response =>{
        return response.json();
    })
    .then(data => {
        console.log(data)
    })
    
}

searchBtn.addEventListener("click", searchCity);