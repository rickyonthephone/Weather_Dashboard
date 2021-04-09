//Declaration of variables for form input
const key = '0642f62247cd5fc4b4b2603fcde8ec95'
var userFormEl = document.getElementById("user-form");
var userCityNameEl = document.getElementById("city-name");
var searchBtnEl = document.getElementById("searchBtn");
var citySelect = userCityNameEl.value.trim();
var historyLinks = document.getElementById("history");
var currentCity = document.getElementById("currentCity")
var today = moment().format("MMM Do, YYYY");
var targetCityWeatherEl = document.getElementById("targetCityWeather");
var weatherIconEl = document.getElementById("weatherIcon");
var uvIndexEL = document.getElementById("currentUvIndex");
var allDates = document.querySelectorAll(".fiveDay");
var forecastDate = document.getElementById("forecastDate");


//clears local storage on refresh
localStorage.clear()

//Prevent default on seach button
function searchCity(searchEvent) {
  searchEvent.preventDefault();
  //Get city name from form input
  var citySelect = userCityNameEl.value.trim();


//Require user to type in a city name
  if (citySelect) {
    getUserWeather(citySelect, false);

  } else {
    alert("City name is required to search.");
  }
}

//function to fetch weather data for current day weather from API based
//on user form input
function getUserWeather(cityName, isHistory) {


//Take above parameter to build URL string
  var apiURL =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=imperial`;
//make API call
  fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {

//extract needed data from the response
      var temp = data.main.temp;
      var humidity = data.main.humidity;
      var speed = data.wind.speed;
      temp = Math.ceil(temp);
      
      weatherIconEl.innerHTML = "";
      var weatherIcon = document.createElement("img");
      weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
      weatherIconEl.appendChild(weatherIcon);
      

      //Change current weather elements using data extract from response
      currentCity.textContent = cityName;
      currentTemp.textContent = temp+" °F";
      currentWind.textContent = speed+" mph";
      currentHumid.textContent = humidity+" %";
      //currentUv.textContent = getUvIndex()
      currentDate.textContent = today; 

      if (!isHistory) {
      //create button for search history
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
    }

//passing lat and lon coordinates so next function/API call can get the 
//5 day forecast - previous call only provided current weather data.
      get5day(data.coord.lat, data.coord.lon)
    });

}

function checkDupes (city, cityList) {
  let found = false
  for (let index = 0; index < cityList.length; index++) {
    const currentCity = array[index];
    if (city == currentCity) {
      found = true
    }
  }
  return found;
}

//call to get 5 day forecast features
function get5day(lat, lon) {
    var apiURL =
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=0642f62247cd5fc4b4b2603fcde8ec95&units=imperial`;
  //API request

  fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      //Getting UV index for current weather. 
      var uvIndex = data.current.uvi;
      uvIndex = Math.ceil(uvIndex);
      uvIndexEL.textContent = "UV Index: "+ uvIndex;

      if(uvIndex >= 0 && uvIndex <= 3){
        uvIndexEL.setAttribute("style", "background-color: green")
      } else if(uvIndex > 3 && uvIndex <= 6){
        uvIndexEL.setAttribute("style", "background-color: yellow")
      } else if(uvIndex > 6 && uvIndex <= 7 ){
        uvIndexEL.setAttribute("style", "background-color: orange")
      } else if(uvIndex > 7 && uvIndex <= 10){
        uvIndexEL.setAttribute("style", "background-color: red")
      } else if(uvIndex >= 11){
        uvIndexEL.setAttribute("style", "background-color: violet")
      };


//5 day forecast loop for getting info from indexes 1 - 5. Index 0 appears to have current day data.
      for (index = 1; index < 6; index++) {
        var day = data.daily[index];
        var temp = parseFloat(day.temp.max);
        temp = Math.ceil(temp);
        //empties the entire div of elements
        allDates[index-1].innerHTML = "";
        //variables to create new elements that append or changes text/attribute content based on criteria below.
        var p = document.createElement("p");
        var p2 = document.createElement("img");
        var p3 = document.createElement("p");
        var p4 = document.createElement("p");
        p.textContent = moment.unix(data.daily[index].dt).format("MM DD, YYYY");

        allDates[index-1].appendChild(p);

        p2.setAttribute("src", `https://openweathermap.org/img/wn/${data.daily[index].weather[0].icon}@2x.png`); 

        allDates[index-1].appendChild(p2);

        p3.textContent = "Temp: "+ temp +" °F"; 

        allDates[index-1].appendChild(p3);

        p4.textContent = "Humidity: "+ data.daily[index].humidity + " %"; 

        allDates[index-1].appendChild(p4);
      }    
    }
  )};

//funciton to access local storage so history buttons will show weather
function getHistoryWeather() {
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

getHistoryWeather();

//get weather data for history buttons
historyLinks.addEventListener("click", function(event){
    var cityName = event.target.textContent;

    getUserWeather(cityName, true);
})
