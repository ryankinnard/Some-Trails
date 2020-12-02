import axios from 'axios';
function getWeather(lat, long) {
  const key = OPEN_WEATHER_KEY;
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=imperial`;

  axios
    .get(url)
    .then(function (response) {
      // handle success
      console.log(response);
      console.log(response.data.name);
      console.log(response.data.main.temp);
      console.log(response.data.weather[0].description);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}
