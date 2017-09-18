var fs = require('fs');

class DataStore {

  constructor() {
    this.data = {
      "readings": []
    };
    this.fileName = "data.json";

    var that = this;
    this.readFile(function(create) {
      if (create) {
        that.writeFile;
      }
    });
  }

  addReading(time, reading) {
    //console.log(this.data.readings);
    this.data.readings.push([time,reading]);
    this.writeFile();
  }

  writeFile() {
    fs.writeFile(this.fileName, JSON.stringify(this.data), function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  }

  readFile() {
    var that = this;
    fs.readFile(this.fileName, 'utf8', function (err,data) {
      if (err) {
        console.log(err);
        return false;
      }
      that.data = JSON.parse(data);
      return true;
    });
  }

  getReadings(start, end, resolution) {
    return this.data.readings;
  }

}

module.exports = DataStore;
