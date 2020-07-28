//featching data using fetch 
function featchData(url){
    return fetch(url)
    
}

//converting data to requried format to plot using highcharts
function convertDataFormat(d){
    let data=[]
     for(let i in d){
        data.push([i,d[i]])
     }
     return data
}
//converting data to requried format to plot using highcharts
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
//fetching and ploting  matchesPerYear 
featchData("matchesPerYear.json").then(res => res.json())
.then((data)=>convertDataFormat(data))
.then((data)=>drawMatchesPerYear(data))
.catch((error)=>console.log(error));

//fetching and ploting matches won per year per team
featchData("matchesWonPerTeamPerYear.json")
.then(res => res.json())
.then((data)=>convertData(data))
.then((d)=>drawMatchesWonPerYearPerTeam(d))
.catch((err)=>console.log(err));

//fetching and ploting top10 economy bowlers
featchData("Top10EcoBowlers.json")
.then(res => res.json())
.then((data)=>convertDataFormat(data))
.then((data)=>drawTop10EcoBowlers(data))
.catch((err)=>console.log(err));

//fetching and ploting ExtraRuns
featchData("ExtraRunsPerTeam2016.json")
.then(res => res.json())
.then((data)=>convertDataFormat(data))
.then((data)=>drawExtraRuns(data))
.catch((err)=>console.log(err));


//function to plot matchesPerYear data
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

//function to plot matches won per year per team
function drawMatchesWonPerYearPerTeam(d1){
    Highcharts.chart('matchesWonPerYear', {

        title: {
            text: "Number of Matches Won Per Team Each Year"
        },
        yAxis: {
            title: {
                text: 'Number of Matches'
            }
        },
    
        xAxis: {
            accessibility: {
                rangeDescription: 'Range: 2008 to 2017'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2008
            }
        },
        series: d1,
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    
    });
}


//function to plot top 10 Economy bowlers in 2015
function drawTop10EcoBowlers(d1){
    Highcharts.chart('top10EcoBowlers', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Top ten econamy bowlers in 2015'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Economy rate'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Economy rate in  2015: <b>{point.y:.1f} runs/over</b>'
        },
        series: [{
            name: 'Bowlers',
            data: d1
        }],
    
                
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        });
}


//function to plot Extra Runs concided per team in year 2016
function drawExtraRuns(d1){
    Highcharts.chart('extraRuns', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Extra runs consided by each team in 2016'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Extra Runs'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Extra Runs in 2016: <b>{point.y:.1f}</b>'
        },
        series: [{
            name: 'Teams',
            data: d1
        }],
    
                
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        });
} 
