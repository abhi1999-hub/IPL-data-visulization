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
function convertData(d){
    accumulator={
            "Kolkata Knight Riders":[0,0,0,0,0,0,0,0,0,0],
            "Chennai Super Kings":[0,0,0,0,0,0,0,0,0,0],
            "Delhi Daredevils":[0,0,0,0,0,0,0,0,0,0],
            "Royal Challengers Bangalore":[0,0,0,0,0,0,0,0,0,0],
            "Rajasthan Royals":[0,0,0,0,0,0,0,0,0,0],
            "Kings XI Punjab":[0,0,0,0,0,0,0,0,0,0],
            "Deccan Chargers":[0,0,0,0,0,0,0,0,0,0],
            "Mumbai Indians":[0,0,0,0,0,0,0,0,0,0],
            "Pune Warriors":[0,0,0,0,0,0,0,0,0,0],
            "Kochi Tuskers Kerala":[0,0,0,0,0,0,0,0,0,0],
            "Sunrisers Hyderabad":[0,0,0,0,0,0,0,0,0,0],
            "Gujarat Lions":[0,0,0,0,0,0,0,0,0,0],
            "Rising Pune Supergiant":[0,0,0,0,0,0,0,0,0,0]
    }
    let pog=0;
    for(let element in d){
            //console.log(d[element])
            for(let i in d[element]){
                accumulator[i][pog]=d[element][i];
            }
            pog++;
    }
    //console.log("converted data",accumulator)
    output=[]
    for(let i in accumulator){
               output.push({name:i,
            data:accumulator[i]})
    }
    console.log(output)
    return output;
    }
featchData("matchesPerYear.json").then(res => res.json())
.then((data)=>convertDataFormat(data))
.then((data)=>drawMatchesPerYear(data))
.catch((error)=>console.log(error));
featchData("matchesWonPerTeamPerYear.json")
.then(res => res.json())
.then((data)=>convertData(data))
.then((data)=>drawMatchesWonPerYearPerTeam(data))
.catch((err)=>console.log(err));
featchData("Top10EcoBowlers.json")
.then(res => res.json())
.then((d)=>convertDataFormat(d))
/*.then((data)=>drawBarChart(data))
.catch((err)=>console.log(err));*/
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
  function drawMatchesWonPerYearPerTeam(d1){
    Highcharts.chart('matchesWonPerYear', {
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