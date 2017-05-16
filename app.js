const yargs = require('yargs');

const geocode = require('./geocode/geocode');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: "Address of the location",
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;
geocode.geocodeAddress(argv.address);