//importing dependency
const csvtojson = require("csvtojson");
const ctj= require("convert-csv-to-json");
const func = require('./ipl.js');
const fs= require("fs");
//converting csv data to Json object
let deliveries = ctj.fieldDelimiter(',').formatValueByType().getJsonFromCsv("..//data//deliveries.csv");
let matches = ctj.fieldDelimiter(',').formatValueByType().getJsonFromCsv("..//data//matches.csv");
//finding starting match id of the year 2015 and 2016
id2016= matches.findIndex( a => a.season===2016)
id2015= matches.findIndex( a=> a.season===2015)

//calling function
let _matchWonPerYear=func.noOfMatchWonPerYear(matches)
let _matchPerYear=func.noOfMatchesPerYear(matches)
let _extraRuns2016=func.extraRuns2016(deliveries,id2016,id2016+_matchPerYear[2016])
let _topTenEcoBowler2015=func.topTenEcoBowler2015(deliveries,id2015,id2015+_matchPerYear[2015])


//writeing in to output file
fs.writeFile('..//output//matchesPerYear.json',JSON.stringify(_matchPerYear), (err)=>
console.log("matchesPerYear File written"));
fs.writeFile('..//output//matchesWonPerTeamPerYear.json',JSON.stringify(_matchWonPerYear), (err)=>
console.log("matchesWonPerTeamPerYear File written"));
fs.writeFile('..//output//ExtraRunsPerTeam2016.json',JSON.stringify(_extraRuns2016), (err)=>
console.log("ExtraRunsPerTeam2016 File written"));
fs.writeFile('..//output//Top10EcoBowlers.json',JSON.stringify(_topTenEcoBowler2015), (err)=>
console.log("Top10EcoBowlers File written"));

