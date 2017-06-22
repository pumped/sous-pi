var dsSensor = require('ds18x20');

class Sensor {

  constructor() {
    this.tempProbe = null;
    this.readingCacheTime = 5000;
    this.reading = { 'temperature':0,
                    'time':0};
  }

  connect() {
    var that = this;

    dsSensor.isDriverLoaded(function(err,isLoaded) {
      //verify driver is loaded without errors
      if (err || !isLoaded) {
        console.warning("Sensor driver is: " + isLoaded);
        console.error(err);
        return false;
      }

      //set default sensor
      dsSensor.list(function (err, listOfDeviceIds) {
          if (listOfDeviceIds.length) {
            that.tempProbe = listOfDeviceIds[0];
            console.log("using " + that.tempProbe)
          }
      });
    });
  }

  configure(params) {
    if (params.hasOwnProperty('readingCacheTime')) {
      this.readingCacheTime = params.readingCacheTime;
    }
  }

  getReading(callback) {
      var that = this;
      var d = new Date;
      if (d.getTime() - this.reading.time > this.readingCacheTime) {
        dsSensor.get(this.tempProbe, function(err,temp) {
          if (err) {
            console.log(err);
          }
          console.log('reading')
          that.reading.time = d.getTime();
          that.reading.temparture = temp;
          callback(temp);
        });
      } else {
        console.log('cache');
        callback(this.reading.temparture);
      }
  }
}

module.exports = Sensor;
