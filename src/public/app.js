function featchData(url){
    return fetch(url)
    
}
function convertDataFormat(d){
    let data=[]
     for(let i in d){
        data.push([i,d[i]])
     }
     return data
}
featchData("matchesPerYear.json").then(res => res.json())
.then((data)=>convertDataFormat(data))
.then((data)=>drawMatchesPerYear(data))
.catch((error)=>console.log(error));
function drawMatchesPerYear(d1){
    Highcharts.chart('matchPerYear', {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false
      },
      title: {
          text: 'IPL<br>mathches<br>share',
          align: 'center',
          verticalAlign: 'middle',
          y: 60
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
          point: {
              valueSuffix: '%'
          }
      },
      plotOptions: {
          pie: {
              dataLabels: {
                  enabled: true,
                  distance: -50,
                  style: {
                      fontWeight: 'bold',
                      color: 'white'
                  }
              },
              startAngle: -90,
              endAngle: 90,
              center: ['50%', '75%'],
              size: '110%'
          }
      },
      series: [{
          type: 'pie',
          name: 'IPL matches count each year',
          innerSize: '50%',
          data: d1
      }]
  });
  }