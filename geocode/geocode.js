const request = require('request');

let geocodeAddress = address => {
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
    json: true
  }, (error, response, body) => {
    if (error) console.log("Sorry, Unable to connect to Google Servers. Please check your internet connection")
    else if (response.statusCode == 200 && body.status == "OK") {
      console.log(`The address is ${body.results[0].formatted_address}`)
      console.log(`The latitude is ${body.results[0].geometry.location.lat}`);
      console.log(`The longitude is ${body.results[0].geometry.location.lng}`);
    } else {
      console.log("Sorry, Unable to fetch data. Please enter a valid address")
    }
  });
};

module.exports = {
  geocodeAddress
}
