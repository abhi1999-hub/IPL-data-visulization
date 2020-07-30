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
            for(let i in d[element]){
                accumulator[i][pog]=d[element][i];
            }
            pog++;
    }
    output=[]
    for(let i in accumulator){
               output.push({name:i,
            data:accumulator[i]})
    }
    console.log(output)
    return output;
    }

//chart details in object for each data to plot on highcharts
let matchesEachYear = {
    tagId:'matchPerYear',
    title:'Total IPL matches Played Each year',
    titleYaxis:"Number OF Matches",
    tooltip:{pointFormat:'matches Played: <b>{point.y:.1f}</b>'}
   }
let matchesWon= {
        tagId:'matchesWonPerYear',
        title:'Matches Won Each Year BY Each Team',
        xAxis: {
            categories: [2008,2009,2010,2011,2012,2013,2014,2015,2016,2017],
            crosshair: true
        },
        titleYaxis:"Number OF Matches",
        tooltip:{
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        }
}
let extraRuns = {
        tagId:'extraRuns',
        title:'Extra runs consided by each team in 2016',
        titleYaxis:"Extra Runs",
        tooltip:{pointFormat:'Extra Runs in 2016: <b>{point.y:.1f}</b>'},
}
let Top10Bowlers = {
        tagId:'top10EcoBowlers',
        title:'Top ten econamy bowlers in 2015',
        titleYaxis:"Economy Rate",
        tooltip:{pointFormat:'Economy rate in  2015: <b>{point.y:.1f} runs/over</b>'}
}
//fetching and ploting  matchesPerYear 
featchData("matchesPerYear.json")
.then(res => res.json())
.then((data)=>convertDataFormat(data))
.then((data)=>drawChart(matchesEachYear,[{
    name: 'Years',
    data: data
}]))
.catch((error)=>console.log(error));

//fetching and ploting matches won per year per team
featchData("matchesWonPerTeamPerYear.json")
.then(res => res.json())
.then((data)=>convertData(data))
.then((data)=>drawChart(matchesWon,data))
.catch((err)=>console.log(err));

//fetching and ploting top10 economy bowlers
featchData("Top10EcoBowlers.json")
.then(res => res.json())
.then((data)=>convertDataFormat(data))
.then((data)=>drawChart(Top10Bowlers,[{
    name: 'Top 10 Bowlers',
    data: data
}]))
.catch((err)=>console.log(err));

//fetching and ploting ExtraRuns
featchData("ExtraRunsPerTeam2016.json")
.then(res => res.json())
.then((data)=>convertDataFormat(data))
.then((data)=>drawChart(extraRuns,[{
    name: 'IPL Teams',
    data: data
}]))
.catch((err)=>console.log(err));


//highchart function to plot the chart
function drawChart(obj,data){
    Highcharts.chart(obj.tagId, {
        chart: {
            type: 'column'
        },
        title: {
            text: obj.title
        },
        xAxis: obj.xAxis || {
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
                text: obj.titleYaxis
            }
        },
        tooltip: obj.tooltip
        ,
        series: data,
    });
} 



