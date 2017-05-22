#!/usr/bin/env node

const yargs = require('yargs');
const axios = require('axios');


const argv = yargs
  .options({
    a: {
      alias: 'address',
      describe: "Address of the location",
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;
  let encodedAddress;
if (argv.address) encodedAddress = encodeURIComponent(argv.address);
else encodedAddress = "trichy";
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then(response => {
  if (response.data.status === 'OK') {
    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lng;
    const weatherUrl = `https://api.darksky.net/forecast/7514f855234bc9afdd64f081f5864435/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl)
  } else {
    throw new Error('Unable to find the location provided. Please check the input and try again.');
  }
}).then(response => {
  console.log(JSON.stringify(response.data.currently, undefined, 2));
}).catch(error => {
  if (error.code === 'ENOTFOUND') console.log("Sorry. Couldn't connect API servers. Please try again later.")
  else console.log(error.message);
});
