//update current date and time
function changeTime() {
  let currentTime = new Date();
  let hour = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[currentTime.getDay()];
  return `${day} ${hour}:${minutes}`;
}
let dateTime = document.querySelector("#dateTime");
dateTime.innerHTML = changeTime();

//display search result
function displayWeather(response) {
console.log(response.data);
  let cityResult = document.querySelector("#city-result");
  cityResult.innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let tempResult = document.querySelector("#temp-display");
  tempResult.innerHTML = `${temperature}°`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;

  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = response.data.weather[0].description;

  let weatherEmoji = document.querySelector("#search-result-emoji");
  if (response.data.weather[0].description === "clear sky") {
    weatherEmoji.innerHTML = "🔆";
  } else {
    if (response.data.weather[0].description === "moderate rain") {
      weatherEmoji.innerHTML = "🌦";
    } else {
      weatherEmoji.innerHTML = "⛅";
    }
  }
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `${response.data.wind.speed}mph`;

  let feels = Math.round(response.data.main.feels_like);
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `${feels}°`;

  let currentCountry = document.querySelector("#country");
  currentCountry.innerHTML = response.data.sys.country;

  let setIcon=document.querySelector("#search-result-emoji");
  setIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

// city by doing a search
function getWeather(event) {
  event.preventDefault();
  let key = `7372c61a1ccb0bd3a2eab67877337642`;
  let city = document.querySelector("#search-bar").value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

let searchButton = document.querySelector("#button-addon2");
searchButton.addEventListener("click", getWeather);

//city by doing a current location serach
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getLocalWeather);

function getLocalWeather() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let apiKey = `7372c61a1ccb0bd3a2eab67877337642`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

//change from Celcius to Farenheit
function changeFarenheit(event) {
  event.preventDefault();
  let h3 = document.querySelector("h3");
  h3.innerHTML = "70°F";
}

function changeCelcius(event) {
  event.preventDefault();
  let h3 = document.querySelector("h3");
  h3.innerHTML = "20°C";
}

let farenheitButton = document.querySelector("#farenheit-button");
farenheitButton.addEventListener(`click`, changeFarenheit);

let celciusButton = document.querySelector("#celcius-button");
celciusButton.addEventListener("click", changeCelcius);
