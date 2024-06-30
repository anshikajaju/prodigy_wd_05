const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const cityElement = document.getElementById('city');
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const weatherElement = document.getElementById('weather');
const hiLowElement = document.getElementById('hi-low');
const forecastList = document.getElementById('forecast-list');

searchBtn.addEventListener('click', setSearchQuery);
searchInput.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    setSearchQuery();
  }
});

function setSearchQuery() {
  const query = searchInput.value;
  getResults(query);
  searchInput.value = '';
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
   .then(response => response.json())
   .then(displayResults);
}

function displayResults(weather) {
  cityElement.innerText = `${weather.name}, ${weather.sys.country}`;
  dateElement.innerText = dateBuilder(new Date());
  tempElement.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  weatherElement.innerText = weather.weather[0].main;
  hiLowElement.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
  getForecast(weather.id);
}

function getForecast(cityId) {
  fetch(`${api.base}forecast?q=${cityId}&units=metric&appid=${api.key}`)
   .then(response => response.json())
   .then(displayForecast);
}

function displayForecast(forecast) {
  let forecastHTML = '';
  forecast.list.forEach((day) => {
    forecastHTML += `
      <li>
        <h2>${day.dt_txt}</h2>
        <p>Temp: ${Math.round(day.main.temp)}°c</p>
        <p>Weather: ${day.weather[0].main}</p>
      </li>
    `;
  });
  forecastList.innerHTML = forecastHTML;
}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}