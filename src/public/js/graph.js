
var ctx = document.getElementById("tempGraph").getContext('2d');
var backChart;

function loadGraph() {
  $.getJSON("/temperatures", function(data) {
    //console.log(data);
    var tempData = [];

    for (let i in data) {
      tempData.push({
        x: new Date(data[i][0]),
        y: data[i][1]
      })
    }

    //console.log(tempData);
    updateGraph(tempData);
  })
};
loadGraph();
setInterval(loadGraph,60000);

function updateGraph(dataset) {
  if (backChart) {
    var data = backChart.data.datasets[0].data;
    var len = data.length;
    var latestPoint = data[len-1].x;
    var earliestPoint = dataset[0].x;

    var deleteCount = 0;
    for (let i=0;i<len;i++) {
      if (data[i].x <= earliestPoint) {
        deleteCount = i;
      }
    }

    if (deleteCount) {
      console.log("deleting: " + deleteCount);
      data.splice(0,deleteCount);
    }

    for (let i=0;i<dataset.length;i++) {
      //console.log(dataset[0].x);
      if (dataset[i].x > latestPoint) {
        backChart.data.datasets[0].data.push(dataset[i]);
      }

    }
    //backChart.data.datasets[0].data.push(dataset[dataset.length-1])

    backChart.update();
    console.log("update");
  } else {
    buildGraph(dataset);
    console.log("build");
  }
}

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

  backChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
  });
}
