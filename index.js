//update current date and time
function changeTime(timestamp) {
  let currentTime = new Date();
  let hour = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes=`0${minutes}`
  };
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


function formatTime(timestamp){
  let currentTime = new Date(timestamp);
  let hour = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hour}:${minutes}`;
}

//display search result
function displayWeather(response) {
  let cityResult = document.querySelector("#city-result");
  let currentCountry = document.querySelector("#country");
  let tempResult = document.querySelector("#temp-display");
  let setIcon=document.querySelector("#search-result-emoji");
  let currentDescription = document.querySelector("#description");
  let feelsLike = document.querySelector("#feels-like");
  let feels = Math.round(response.data.main.feels_like);
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind-speed");
  let pressure=document.querySelector("#pressure");
  let sunrise=document.querySelector("#sunrise");
  let sunset=document.querySelector("#sunset");

  celsiusTemp = Math.round(response.data.main.temp);

  cityResult.innerHTML = response.data.name;
  currentCountry.innerHTML = response.data.sys.country;
  tempResult.innerHTML = celsiusTemp;
  setIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  currentDescription.innerHTML = response.data.weather[0].description;
  feelsLike.innerHTML = `${feels}°`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed}mph`;
  pressure.innerHTML=`${response.data.main.pressure} mbar`;

  sunrise.innerHTML=`${formatTime(response.data.sys.sunrise)} am`;
  sunset.innerHTML= `${formatTime(response.data.sys.sunset)} pm`;
  
  console.log (response);
}


//display forecast
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML=null;
  let forecast= null

  console.log(forecast);

  for (let index = 0; index < 6; index++) {
  forecast = response.data.list[index];
  forecastElement.innerHTML+=`
  <div class="col-2 rounded-pill flex-fill shadow">
  ${formatTime(forecast.dt*1000)}
  <br />
  <strong>${Math.round(forecast.main.temp_max)} °
  </strong> ${Math.round(forecast.main.temp_min)}°
  <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="" id="search-result-emoji">
  </div>`;  
  }
}



// city by doing a search
function getWeather(event) {
  event.preventDefault();
  let key = `5713baa58fbf84a333ac48a2b980784e`;
  let city = document.querySelector("#search-bar").value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

let searchButton = document.querySelector("#button-addon2");
searchButton.addEventListener("click", getWeather);

//city by doing a current location serach
function getLocalWeather() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getLocalWeather);



function showPosition(position) {
  let apiKey = `5713baa58fbf84a333ac48a2b980784e`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

//change from Celcius to Farenheit
function changeFarenheit(event) {
  event.preventDefault();
  celciusButton.classList.remove("active");
  farenheitButton.classList.add("active");
  let farenheitTemp = document.querySelector("#temp-display");
  farenheitTemp.innerHTML=Math.round((celsiusTemp * 9) / 5 + 32);
}

function changeCelcius(event) {
  event.preventDefault();
  celciusButton.classList.add("active");
  farenheitButton.classList.remove("active");
  let temperatureElement = document.querySelector("#temp-display");
  temperatureElement.innerHTML = celsiusTemp
}
 let celsiusTemp = null;


let farenheitButton = document.querySelector("#farenheit-button");
farenheitButton.addEventListener(`click`, changeFarenheit);

let celciusButton = document.querySelector("#celcius-button");
celciusButton.addEventListener("click", changeCelcius);

getLocalWeather();