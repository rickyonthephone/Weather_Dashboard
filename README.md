# 06 Server-Side APIs: Weather Dashboard

## Task

 Build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS using the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities and use `localStorage` to store any persistent data.

 Github code: https://github.com/rickyonthephone/Weather_Dashboard

 Github page: https://rickyonthephone.github.io/Weather_Dashboard/

 Screenshot: ![screenshot]()

## How to Start

```
WHEN you arrive on the page
ENTER a city's name to retrieve weather data
THEN your selected city's current and 5 day forecast will be presented to you.
```

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

