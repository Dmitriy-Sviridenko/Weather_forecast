//Переменные для работы с API
const ApiKey = "5636b1bfe251634f876d672ff385cd52"
const currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`
const forecastApiUrl = `http://api.openweathermap.org/data/2.5/forecast?units=metric&q=`

//Переменные для кнопок
const searchButton = document.querySelector(".search-box button");
const currentWeatherButton = document.querySelector(".form_radio_group--curent");
const forecastWeatherButton = document.querySelector(".form_radio_group--forecast");

//Остальные переменные
const searchInput = document.querySelector(".search-box input");
const weather = document.querySelector(".weather");
const weatherImage = document.querySelector(".current-weather__img");
const error = document.querySelector(".error");
const errorEmpty = document.querySelector(".error_empty");
const container = document.querySelector(".container");


//массив с картинками
let imgs = {
  Clear : 'img/clear.svg',
  Rain : 'img/rain.svg',
  Clouds : 'img/clouds.svg',
  Drizzle : "img/drizzle.svg",
  Snow : "img/snow.svg",
  Thunderstorm : "img/thunderstorm.svg"
};


//Показ текущей погоды
async function checkCurrentWeather () {
  // отчищаем поля ошибок
  error.style.display = "none"
  errorEmpty.style.display = "none"

  // Вывод ошибки при отправке пустой формы
  if (searchInput.value === "") {
    errorEmpty.style.display = "block"
    weather.classList.remove("active")
    container.classList.remove("active")
    container.style.height = "160px"
    return
  }

  //получение данных от API
  const response = await fetch (currentApiUrl + searchInput.value + `&appid=${ApiKey}`);
  
  //отработка неправильного название
  if (response.status == 404) {
    error.style.display = "block"
    weather.classList.remove("active")
    container.classList.remove("active")
    container.style.height = "160px"
  }

  const data = await response.json();

  //заполняем данными поля
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".current_temp").innerHTML = Math.round(data.main.temp) + "&#8451";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";
  document.querySelector(".current_weather_disc").innerHTML = data.weather[0].main
  

  //смена иконки погоды
  switch (data.weather[0].main) {
    case "Clear" : weatherImage.src = imgs.Clear; break;
    case "Rain" : weatherImage.src = imgs.Rain; break;
    case "Clouds" : weatherImage.src = imgs.Clouds; break;
    case "Drizzle" : weatherImage.src = imgs.Drizzle; break;
    case "Thunderstorm" : weatherImage.src = imgs.Thunderstorm; break;
    case "Snow" : forecastWeekImg[i].src = imgs.Snow; break;
  }

  container.style.height = "570px"
  weather.classList.add("active");
}


//Четырехдневный прогноз
//переменные для даты


async function checkForecastWeather () {
  error.style.display = "none"
  errorEmpty.style.display = "none"

  // Вывод ошибки при отправке пустой формы
  if (searchInput.value === "") {
    errorEmpty.style.display = "block"
    weather.classList.remove("active")
    container.classList.remove("active")
    container.style.height = "160px"
    return
  }

  const response = await fetch (forecastApiUrl + searchInput.value + `&appid=${ApiKey}`);

  //отработка неправильного название
  if (response.status == 404) {
    error.style.display = "block"
    weather.classList.remove("active")
    container.classList.remove("active")
    container.style.height = "160px"
  }

  const data = await response.json();

  console.log(data)

  //заполняем данными поля
  document.querySelector(".forecast_weather_city").innerHTML = data.city.name;
  const daysOfWeek = document.querySelectorAll(".forecast_weather_day");
  const forecastTime = document.querySelectorAll(".forecast_weather_time");
  const forecastWeekTemp = document.querySelectorAll(".forecast_weather_temp");
  const forecastWeekDisk = document.querySelectorAll(".forecast_weather_disc"); 
  const forecastWeekImg =  document.querySelectorAll(".forecast_weather__img");   

  for (let i = 0; i < 4; i++){
    const curentDate = new Date;
    curentDate.setDate(curentDate.getDate() + (i+1));
    daysOfWeek[i].innerHTML = curentDate.getDate() + "-" + (curentDate.getMonth()+1)
    forecastTime[i].innerHTML = data.list[((i+1)*8)].dt_txt.substr(11, 5);

    forecastWeekTemp[i].innerHTML = Math.round(data.list[((i+1)*8)].main.temp) + "&#8451";
    forecastWeekDisk[i].innerHTML = data.list[((i+1)*8)].weather[0].main;
    switch (data.list[((i+1)*8)].weather[0].main) {
      case "Clear" : forecastWeekImg[i].src = imgs.Clear; break;
      case "Rain" : forecastWeekImg[i].src = imgs.Rain; break;
      case "Clouds" : forecastWeekImg[i].src = imgs.Clouds; break;
      case "Drizzle" : forecastWeekImg[i].src = imgs.Drizzle; break;
      case "Thunderstorm" : forecastWeekImg[i].src = imgs.Thunderstorm; break;
      case "Snow" : forecastWeekImg[i].src = imgs.Snow; break;
    }
  }
}


//Вызов функции по клику
searchButton.addEventListener("click", () => {
  checkCurrentWeather()
  checkForecastWeather ()
  searchInput.value = ""
});

//Вызов функции через клавишу Enter
searchInput.addEventListener("keydown", (e) => {
  if(e.keyCode === 13) {
    checkCurrentWeather()
    checkForecastWeather ()
    searchInput.value = ""
  }
});

currentWeatherButton.addEventListener("click", () => {
  currentWeatherButton.classList.add("form_radio_group_active")
  forecastWeatherButton.classList.remove("form_radio_group_active")

  document.querySelector(".current_weather").style.display = "block";
  document.querySelector(".forecast_weather").style.display = "none"
});

forecastWeatherButton.addEventListener("click", () => {
  forecastWeatherButton.classList.add("form_radio_group_active")
  currentWeatherButton.classList.remove("form_radio_group_active")


  document.querySelector(".forecast_weather").style.display = "block"
  document.querySelector(".current_weather").style.display = "none";
});





