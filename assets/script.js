//Declaration of variables for form input
var userFormEl = document.getElementById("user-form");
var userCityNameEl = document.getElementById("city-name");
var searchBtnEl = document.getElementById("searchBtn");
var citySelect = userCityNameEl.value.trim();
var quickLinks = document.getElementById("history");

//Prevent default on seach button
function searchCity(searchEvent) {
  searchEvent.preventDefault();
  //Get city name from form input
  var citySelect = userCityNameEl.value.trim();

  // console.log("The city you selected is " + citySelect);

  if (citySelect) {
    getUserWeather(citySelect);
    console.log("I have city " + citySelect);
  } else {
    alert("City name is required to search.");
  }
}

function getUserWeather(name) {
  console.log("Searching for city " + name);

  //Take above parameter to build URL string

  var apiURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    name +
    "&appid=0642f62247cd5fc4b4b2603fcde8ec95&units=imperial";
  //API request

  fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      var btn = document.createElement("button");
      btn.classList = "quickCityBtn";
      btn.textContent = name;

      var cities = JSON.parse(localStorage.getItem("cities"));
      if (!cities) {
        cities = [];
      }
      cities.push(name);
      localStorage.setItem("cities", JSON.stringify(cities));

      quickLinks.appendChild(btn);

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

      for (let index = 0; index < 5; index++) {
          var day = data.daily[index];
          console.log(day.temp.max)
          console.log(day.humidity)
          console.log(day.weather.icon)
          //var date = moment(data.dt).format("dd.mm.yyyy hh:MM:ss")
          //console.log(date);
      }
      
    });
  /**
     *       <div class="forecastA" id="fiveDay">
         <p>Date<span class = "dateA"></span></p>
        <i<span class = "dateAIcon">Icon</span></i>
    <p class="temp">Temp:<span class = "dateATemp"></span></p>
<p class="humidity2">Humidity:<span class="dateAHumid"></span></p>
            </div>
     */
}
function getItems() {
  var cities = JSON.parse(localStorage.getItem("cities"));

  if (cities) {
    for (let index = 0; index < cities.length; index++) {
      var btn = document.createElement("button");
      btn.classList = "quickCityBtn";
      btn.textContent = cities[index];
      quickLinks.appendChild(btn);
    }
  }
}
searchBtn.addEventListener("click", searchCity);

getItems();

quickLinks.addEventListener("click", function(event){
    var cityName = event.target.textContent;

    console.log(event.target);

    getUserWeather(cityName);
})
