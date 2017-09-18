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

    this.insertCount = 0;
    this.writeCount = 16;
  }

  addReading(time, reading) {
    //console.log(this.data.readings);
    this.data.readings.push([time,reading]);
    this.trimReadings();
    this.insertCount++;
    if (this.insertCount == this.writeCount) {
      this.insertCount = 0;
      this.writeFile();
    }
  }

  trimReadings() {
    let maxLength = 100;
    if (this.data.readings.length > maxLength) {
      let diff = this.data.readings.length - maxLength;
      this.data.readings.splice(0,diff);
    }
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
