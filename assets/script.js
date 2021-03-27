//Declaration of variables for form input
const key = '0642f62247cd5fc4b4b2603fcde8ec95'
var userFormEl = document.getElementById("user-form");
var userCityNameEl = document.getElementById("city-name");
var searchBtnEl = document.getElementById("searchBtn");
var citySelect = userCityNameEl.value.trim();
var historyLinks = document.getElementById("history");
var currentCity = document.getElementById("currentCity")
var today = moment().format("MMM Do YYYY");

//Prevent default on seach button
function searchCity(searchEvent) {
  searchEvent.preventDefault();
  //Get city name from form input
  var citySelect = userCityNameEl.value.trim();

//Require user to type in a city name
  if (citySelect) {
    getUserWeather(citySelect);
    console.log("I have city " + citySelect);
  } else {
    alert("City name is required to search.");
  }
}

//function to fetch weather data for current day weather from API based
//on user form input
function getUserWeather(cityName) {
  console.log("Searching for city " + cityName);

//Take above parameter to build URL string
  var apiURL =`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=imperial`;
//make API call
  fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const {temp, humidity} = data.main
      const {icon} = data.weather[0];
      const {speed} = data.wind
      console.log(temp, humidity, icon, speed);
//Change current weather elements using data
      currentCity.textContent = cityName;
      currentTemp.textContent = temp +" °F";
      currentWind.textContent = speed+" mph";
      currentHumid.textContent = humidity+" %";
      currentDate.textContent = today; 
      
//create button for history
      var btn = document.createElement("button");
      
      btn.classList = "historyCityBtn";
      btn.textContent = cityName;

      var cities = JSON.parse(localStorage.getItem("cities"));
      if (!cities) {
        cities = [];
      }
      cities.push(cityName);
      localStorage.setItem("cities", JSON.stringify(cities));

      historyLinks.appendChild(btn);

//passing lat and lon coordinates so next function/API call can get the 
//5 day forecast - previous call only provided current weather data.
      get5day(data.coord.lat, data.coord.lon)
    });

}

function get5day(lat, lon) {
    var apiURL =
    `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=0642f62247cd5fc4b4b2603fcde8ec95&units=imperial`;
  //API request

  fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      for (index = 0; index < 5; index++) {
          var day = data.daily[index];
          var date = moment(data.dt).format("M.DD.YYYY");
          console.log(date);
          console.log(day.weather.icon)
          console.log(day.temp.max)
          console.log(day.humidity)
      }
      
    });

}

//funciton to access local storage so history buttons will show weather
function getItems() {
  var cities = JSON.parse(localStorage.getItem("cities"));

  if (cities) {
    for (let index = 0; index < cities.length; index++) {
      var btn = document.createElement("button");
      btn.classList = "historyCityBtn";
      btn.textContent = cities[index];
      historyLinks.appendChild(btn);
    }
  }
}


//search for city based on form input
searchBtn.addEventListener("click", searchCity);

getItems();

//get weather data for history buttons
historyLinks.addEventListener("click", function(event){
    var cityName = event.target.textContent;

    console.log(event.target);

    getUserWeather(cityName);
})
