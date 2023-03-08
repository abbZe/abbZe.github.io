const cities =  {
  7498240 : "Jerusalem",
  293397 : "Tel Aviv",
  295277 : "Eilat",
  295721 : "Acre",
  293822 : "Qiryat Yam",
  294800 : "Haifa",
  554234 : "Kaliningrad",
  588409 : "Tallinn",
  524894 : "Moscow",
}
const param = {
  url: 'https://api.openweathermap.org/data/2.5/',
  appid: '83fc76ade15bd7b94068873aa551c29a',

}
http://openweathermap.org/img/wn/${01n}@2x.png

function createCitiesSelector() {
  let citiesSelector = document.querySelector('.citiesSelector');
  let select = document.createElement('select');
  select.setAttribute('id', 'city');

  for (let key in cities) {
    select.innerHTML += `<option value="${key}">${cities[key]}</option>`
  }

  citiesSelector.append(select);
}
createCitiesSelector();

function getWeather() {
  const cityId = document.querySelector('#city').value;
  fetch(`${param.url}weather?id=${cityId}&units=metric&appid=${param.appid}`)
    .then(weather => {return weather.json();}).then(showWeather);
}

function showWeather(data) {
  console.log(data);

  let weatherIconLink = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">`;
  let weatherIcon =  document.querySelector('.weatherApp__weatherImage');
  let cityName = document.querySelector('.weatherApp__cityName');
  let temp = document.querySelector('.weatherApp__temp');
  let feelsLike = document.querySelector('.weatherApp__feelsLike');
  let maxTempToday = document.querySelector('.weatherApp__maxTempToday');
  let minTempToday = document.querySelector('.weatherApp__minTempToday');
  let state = document.querySelector('.weatherApp__state'); // sostojanie, naprimer ,'cloudy';
  let humidity = document.querySelector('.weatherApp__humidity');
  let windDirection = document.querySelector('.weatherApp__windDirection');
  let windSpeed = document.querySelector('.weatherApp__windSpeed');
  let pressure = document.querySelector('.weatherApp__pressure');

  cityName.textContent = data.name;
  weatherIcon.innerHTML = weatherIconLink;
  temp.innerHTML = `${data.main.temp} &#8451;`;
  feelsLike.innerHTML = `${data.main.feels_like} &#8451;`;
  maxTempToday.innerHTML = `${data.main.temp_max} &#8451;`;
  minTempToday.innerHTML = `${data.main.temp_min} &#8451;`;
  state.innerHTML = data.weather[0].description;
  humidity.innerHTML = data.main.humidity;
  windDirection.innerHTML = data.wind.deg;
  windSpeed.innerHTML = data.wind.speed;
  pressure.innerHTML = data.main.pressure;
}
getWeather()

document.querySelector('#city').onchange = getWeather;