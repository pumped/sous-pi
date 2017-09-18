
var ctx = document.getElementById("tempGraph").getContext('2d');

$.getJSON("/temperatures", function(data) {
  //console.log(data);
  var tempData = [];

  for (let i in data) {
    tempData.push({
      x: new Date(data[i][0]),
      y: data[i][1]
    })
  }

  console.log(tempData);
  buildGraph(tempData);
})

function buildGraph(dataset) {
  var data = {
      datasets: [{
          label: 'Temperature',
          data: dataset,
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  };

  var options = {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:false
              }
          }],
          xAxes: [{
                type: 'time',
                distribution: 'series'
            }]
      },
      legend: {
        display:false
      }
  };

  var myChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
  });
}
