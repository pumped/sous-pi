const express = require('express');
const app = express();
const fs = require('fs');
const Sensor = require('./Sensor.js');
var sensor = new Sensor();

sensor.connect();

app.use(express.static('src/public'));

app.get('/temp', function(req, res) {
  sensor.getReading(function(temp) {
    res.send(String(temp));
  });
})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})
