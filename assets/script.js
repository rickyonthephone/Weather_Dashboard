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

var dateAEl = document.getElementById("dateA");
var dateBEl = document.getElementById("dateB");
var dateCEl = document.getElementById("dateC");
var dateDEl = document.getElementById("dateD");
var dateEEl = document.getElementById("dateE");

var dateAIconEl = document.getElementById ("dateAIcon");
var dateBIconEl = document.getElementById ("dateBIcon");
var dateCIconEl = document.getElementById ("dateCIcon");
var dateDIconEl = document.getElementById ("dateDIcon");
var dateEIconEl = document.getElementById ("dateEIcon");

var dateATempEl = document.getElementById ("dateATemp");
var dateBTempEl = document.getElementById ("dateBTemp");
var dateCTempEl = document.getElementById ("dateCTemp");
var dateDTempEl = document.getElementById ("dateDTemp");
var dateETempEl = document.getElementById ("dateETemp");

var dateAHumidEl = document.getElementById ("dateAHumid");
var dateBHumidEl = document.getElementById ("dateBHumid");
var dateCHumidEl = document.getElementById ("dateCHumid");
var dateDHumidEl = document.getElementById ("dateDHumid");
var dateEHumidEl = document.getElementById ("dateEHumid");

var forecastDate = document.getElementById("forecastDate");
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
//extract needed data from the response
      const {temp, humidity} = data.main
      const {icon} = data.weather[0];
      const {speed} = data.wind

      var weatherIcon = document.createElement("img");
      weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
      weatherIconEl.appendChild(weatherIcon);

      console.log(weatherIcon);
      console.log(temp, humidity, icon, speed);
//Change current weather elements using data extract from response
      currentCity.textContent = cityName;
      //need to get icon to insert vs. icon code.
      // weatherIcon.textContent = icon;
      currentTemp.textContent = temp +" °F";
      currentWind.textContent = speed+" mph";
      currentHumid.textContent = humidity+" %";
    //currentUv.textContent = getUvIndex()
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

//call to get 5 day forecast features
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

//5 day forecast loop for getting info from indicies 1 - 5. Index 0 appears to have current day data.
//this is where I am running into problems and I think I'm starting to go in circles. 

      for (index = 1; index < 6; index++) {
        var day = data.daily[index];
        var forecastDate = moment.unix(day.dt).format("MM DD, YYYY");
        var humidity = day.humidity;
        var icon = day.weather[0].icon;
        var temp = day.temp.max;

        console.log(forecastDate);
        console.log(icon);
        console.log(temp);
        console.log(humidity);
        
        dateA.innerText = moment.unix(data.daily[1].dt).format("MM DD, YYYY");
        dateB.innerHTML = moment.unix(data.daily[2].dt).format("MM DD, YYYY");
        dateC.innerHTML = moment.unix(data.daily[3].dt).format("MM DD, YYYY");
        dateD.innerHTML = moment.unix(data.daily[4].dt).format("MM DD, YYYY");
        dateE.innerHTML = moment.unix(data.daily[5].dt).format("MM DD, YYYY");
        
        //need to figure out how to insert icons instead of icon code.
        dateAIcon.innerHTML = data.daily[1].weather[0].icon; 
        dateBIcon.innerHTML = data.daily[2].weather[0].icon;
        dateCIcon.innerHTML = data.daily[3].weather[0].icon;
        dateDIcon.innerHTML = data.daily[4].weather[0].icon;
        dateEIcon.innerHTML = data.daily[5].weather[0].icon;

        dateATemp.innerHTML = data.daily[1].temp.max +" °F"; 
        dateBTemp.innerHTML = data.daily[2].temp.max +" °F";
        dateCTemp.innerHTML = data.daily[3].temp.max +" °F";
        dateDTemp.innerHTML = data.daily[4].temp.max +" °F";
        dateETemp.innerHTML = data.daily[5].temp.max +" °F";

        dateAHumid.innerHTML = data.daily[1].humidity + " %"; 
        dateBHumid.innerHTML = data.daily[2].humidity + " %";
        dateCHumid.innerHTML = data.daily[3].humidity + " %";
        dateDHumid.innerHTML = data.daily[4].humidity + " %";
        dateEHumid.innerHTML = data.daily[5].humidity + " %";
        
      }

      
       
    
    }
  )};

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
