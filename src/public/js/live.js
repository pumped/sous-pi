function updateTemp() {
  var myRequest = new Request('/temp');
  fetch(myRequest).then(function(resp){
    resp.text().then(function(val){
      if (val == "false") {
        val = 0;
      }
      document.getElementById('temperature').innerHTML = val;
      if (val != 0) {
        insertGraphPoint({x:new Date(),y:Number(val)});
      }
      this.setTimeout( function(){updateTemp();},5000);
    });
  });
}

function CountDownTimer(endDate, id) {
    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;

    function showRemaining() {
        var now = new Date();
        var distance = endDate - now;
        if (distance < 0) {

            clearInterval(timer);
            document.getElementById(id).innerHTML = 'EXPIRED!';

            return;
        }
        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);

        //document.getElementById(id).innerHTML = days + ':' + leadingZero(hours)+ ':' + leadingZero(minutes)+ ':' + leadingZero(seconds);

        document.getElementById(id).innerHTML = days + 'days ';
        document.getElementById(id).innerHTML += hours + 'hrs ';
        document.getElementById(id).innerHTML += minutes + 'mins ';
        //document.getElementById(id).innerHTML += seconds + 'secs';
    }

    timer = setInterval(showRemaining, 1000);
}

function leadingZero(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}

var finishDate = new Date(2017, 8, 19, 18, 30);
CountDownTimer(finishDate,"timeleft");

this.setTimeout( function(){updateTemp();}, 1000);
