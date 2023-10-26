const apiKey = "5636b1bfe251634f876d672ff385cd52"
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`
const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");
const weather = document.querySelector(".weather");
const weatherImage = document.querySelector(".weather__img");
const error = document.querySelector(".error");
const errorEmpty = document.querySelector(".error_empty");
const container = document.querySelector(".container")
let imgs = {
  Clear : 'img/clear.svg',
  Rain : 'img/rain.svg',
  Clouds : 'img/clouds.svg',
  Drizzle : "img/drizzle.svg",
  Snow : "img/snow.svg",
  Thunderstorm : "img/thunderstorm.svg"
}


async function checkWeather () {
  //отчищаем поля ошибок
  error.style.display = "none"
  errorEmpty.style.display = "none"

  //Вывод ошибки при отправке пустой формы
  if (searchInput.value === "") {
    errorEmpty.style.display = "block"
    weather.classList.remove("active")
    container.classList.remove("active")
    container.style.height = "160px"
    return
  }

  //получение данных от API
  const response = await fetch (apiUrl + searchInput.value + `&appid=${apiKey}`);
  
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
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&#8451";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";
  document.querySelector(".weather_disc").innerHTML = data.weather[0].main
  

  //смена иконки погоды
  switch (data.weather[0].main) {
    case "Clear" : weatherImage.src = imgs.Clear; break;
    case "Rain" : weatherImage.src = imgs.Rain; break;
    case "Clouds" : weatherImage.src = imgs.Clouds; break;
    case "Drizzle" : weatherImage.src = imgs.Drizzle; break;
    case "Thunderstorm" : weatherImage.src = imgs.Thunderstorm; break;
  }

  container.style.height = "570px"
  weather.classList.add("active");
}

//Вызов функции по клику
searchButton.addEventListener("click", () => {
  checkWeather()
  searchInput.value = ""
});

//Вызов функции через клавишу Enter
searchInput.addEventListener("keydown", (e) => {
  if(e.keyCode === 13) {
    checkWeather()
    searchInput.value = ""
  }
});


