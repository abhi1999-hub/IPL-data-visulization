const csvtojson = require("csvtojson");
const ctj= require("convert-csv-to-json");
const fs= require("fs");
let deliveries = ctj.fieldDelimiter(',').formatValueByType().getJsonFromCsv("..//data//deliveries.csv");
let matches = ctj.fieldDelimiter(',').formatValueByType().getJsonFromCsv("..//data//matches.csv");
id2016= matches.findIndex( a => a.season===2016)
id2015= matches.findIndex( a=> a.season===2015)
//console.log(id2016,id2015)
const func = require('./ipl.js');
let m=func.noOfMatchWonPerYear(matches)
let w=func.noOfMatchesPerYear(matches)
//console.log(w[2016],w[2015])
let r=func.extraruns(deliveries,id2016,id2016+w[2016])
let out4=func.bowlereco(deliveries,id2015,id2015+w[2015])
fs.writeFile('..//output//matchesPerYear.json',JSON.stringify(w), (err)=>
console.log("matchesPerYear File written"));
fs.writeFile('..//output//matchesWonPerTeamPerYear.json',JSON.stringify(m), (err)=>
console.log("matchesWonPerTeamPerYear File written"));
fs.writeFile('..//output//ExtraRunsPerTeam2016.json',JSON.stringify(r), (err)=>
console.log("ExtraRunsPerTeam2016 File written"));
fs.writeFile('..//output//Top10EcoBowlers.json',JSON.stringify(out4), (err)=>
console.log("Top10EcoBowlers File written"));