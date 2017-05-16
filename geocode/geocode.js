const request = require('request');

let geocodeAddress = (address, callback) => {
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
    json: true
  }, (error, response, body) => {
    if (error) callback("Sorry, Unable to connect to Google Servers. Please check your internet connection")
    else if (response.statusCode == 200 && body.status == "OK") {
      callback(undefined, {
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    } else {
      callback("Sorry, Unable to fetch data. Please enter a valid address")
    }
  });
};

module.exports = {
  geocodeAddress
}