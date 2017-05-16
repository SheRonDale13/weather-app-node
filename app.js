const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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
let address;
if(argv.address) address = argv.address;
else address = "trichy";
geocode.geocodeAddress(address, (errorMessage, results) => {
  if (errorMessage) console.log(errorMessage)
  else {
    console.log(results.address);
    weather.getWeatherInfo(results.latitude, results.longitude, (errorMessage, results) => {
      if(errorMessage) console.log(errorMessage);
      else console.log(JSON.stringify(results, undefined, 2));
    });
  }
});
