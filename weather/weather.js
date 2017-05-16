const request = require('request');

let getWeatherInfo = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/7514f855234bc9afdd64f081f5864435/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (error) callback("Sorry, Unable to connect to darksky.net. Please try again later.");
    else if (response.statusCode === 200) {
      callback(undefined, body.currently);
    } else callback("Sorry, Cant fetch weather information. Please try again later.")
  });
}

module.exports = {
  getWeatherInfo
}
