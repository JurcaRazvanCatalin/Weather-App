const wrapper = document.querySelector('.wrapper'),
  inputPart = wrapper.querySelector('.input-part'),
  infoText = inputPart.querySelector('.info-text'),
  inpField = inputPart.querySelector('input'),
  locationBtn = inputPart.querySelector('button'),
  weather = wrapper.querySelector('.weather'),
  cont = document.querySelector('.container'),
  sunny = document.getElementById('ws'),
  cloudy = document.getElementById('wc'),
  snowy = document.getElementById('snow'),
  variab = document.getElementById('wcs'),
  rainny = document.getElementById('wr');

let api;

function onSucces(succes) {
  const { lat, long } = succes.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=c8b529a690f054a7efcd41d4e61d3868`;
  fetchData();
}

function onerror(error) {
  infoText.innerText = error.message;
  infoText.classList.add('.error');
}

locationBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSucces, onerror);
  } else {
    alert('Ups Error');
  }
});

function requestCity(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c8b529a690f054a7efcd41d4e61d3868`;
  fetchData();
}

function fetchData() {
  infoText.innerText = 'Getting weather details...';
  infoText.classList.add('.pending');
  fetch(api)
    .then(response => response.json())
    .then(result => weatherDetails(result));
}

inpField.addEventListener('keyup', e => {
  if (e.key == 'Enter' && inpField.value != '') {
    requestCity(inpField.value);
  }
});

function weatherDetails(info) {
  infoText.classList.replace('.pending', '.error');
  if (info.cod == '404') {
    infoTxt.classList.replace('pending', 'error');
    infoTxt.innerText = `${inputField.value} isn't a valid city name`;
  } else {
    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { feels_like, humidity, temp } = info.main;
    console.log(id);
    if (id == 800) {
      cont.innerHTML = `<div class="weather-sun" id="ws">
            <div class="sun">
              <div class="rays"></div>
              <div class="rays"></div>
              <div class="rays"></div>
              <div class="rays"></div>
            </div>
          </div>`;
    } else if (id >= 600 && id <= 622) {
      cont.innerHTML = `<div class="snow" id="snow">
            <div class="f"></div>
          </div>`;
    } else if (id >= 701 && id <= 781) {
      cont.innerHTML = `<div class="weather-cloudAndSun" id="wcs">
            <div class="cloud"></div>
            <div class="sun">
              <div class="rays"></div>
              <div class="rays"></div>
              <div class="rays"></div>
              <div class="rays"></div>
            </div>
          </div>`;
    } else if (id >= 801 && id <= 804) {
      cont.innerHTML = `<div class="weather-cloud" id="wc">
            <div class="cloud"></div>
            <div class="cloud"></div>
          </div>`;
    } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
      cont.innerHTML = `<div class="weather-rain" id="wr">
            <div class="cloud"></div>
            <div class="rain"></div>
            <div class="rain"></div>
            <div class="rain"></div>
            <div class="rain"></div>
          </div>`;
    } else if (id >= 200 && id <= 232) {
      cont.innerHTML = `<div class="weather-rain" id="wr">
            <div class="cloud"></div>
            <div class="rain"></div>
            <div class="rain"></div>
            <div class="rain"></div>
            <div class="rain"></div>
          </div>`;
    }

    weather.querySelector('.temp .numb').innerText = Math.floor(temp);
    weather.querySelector('.location span').innerText = `${city}, ${country}`;
    weather.querySelector('.temp .numb-2').innerText = Math.floor(feels_like);
    weather.querySelector('.humidity span').innerText = `${humidity}%`;
    infoText.classList.remove('pending', 'error');
    infoText.innerText = '';
    inpField.value = '';
    wrapper.classList.add('active');
    console.log(info);
  }
}
