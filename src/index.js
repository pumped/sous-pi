const express = require('express');
const app = express();
const fs = require('fs');
const Sensor = require('./Sensor.js');
var sensor = new Sensor();

var DataStore = require('../src/DataStore.js');
var data = new DataStore();

sensor.connect();

app.use(express.static('src/public'));

app.get('/temp', function(req, res) {
  sensor.getReading(function(temp) {
    res.send(String(temp));
  });
});

app.get('/temperatures', function(req, res) {
  res.send(data.getReadings());
})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})

setInterval(function() {
  sensor.getReading(function(temp) {
    //temp = getRandomInt(60,64);
    if (temp) {
      var time = new Date();
      data.addReading(time, temp);
    } else {
      console.warn("no temp found");
    }
  });
}, 15000);

function getRandomInt(min, max) {
  min = Math.ceil(min)*10;
  max = Math.floor(max)*10;
  return (Math.floor(Math.random() * (max - min)) + min) / 10; //The maximum is exclusive and the minimum is inclusive
}
