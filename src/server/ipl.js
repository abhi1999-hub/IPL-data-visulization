const fs=require('fs');
function connectdatabase(database,sql){
    return new Promise((resolve,reject)=>(
       database.query(sql,(err,results,fields)=>{
           if(err){
               reject(err);
           }
           resolve(results)
   })
))}
   
function noOfMatchesPerYear(database){
    console.log("hai")
    const query="SELECT season, count(season) AS numberOFMatches FROM matches GROUP BY season ORDER BY season"
    connectdatabase(database,query).then((output)=>fs.writeFile('..//output//matchesPerYear.json',JSON.stringify(output), (err)=>
    console.log("matchesPerYear File written")))
}
function noOfMatchWonPerYear(database){
    const query="SELECT season,winner as Team, count(*) as matches_won FROM matches GROUP BY winner,season"
    return connectdatabase(database,query).then((output)=>fs.writeFile('..//output//matchesWonPerTeamPerYear.json',JSON.stringify(output), (err)=>
    console.log("matchesWonPerTeamPerYear File written")))
}
function extraRuns2016(database){
    const query="SELECT bowling_team AS team , sum(extra_runs) AS Extra_runs FROM deliveries WHERE match_id IN (SELECT id FROM matches WHERE season=2016) GROUP BY(bowling_team)"
    return connectdatabase(database,query).then((output)=>fs.writeFile('..//output//ExtraRunsPerTeam2016.json',JSON.stringify(output), (err)=>
    console.log("ExtraRunsPerTeam2016 File written")))
}

module.exports.noOfMatchesPerYear=noOfMatchesPerYear;
module.exports.noOfMatchWonPerYear=noOfMatchWonPerYear;
module.exports.extraRuns2016=extraRuns2016;
//module.exports.topTenEcoBowler2015=topTenEcoBowler2015;