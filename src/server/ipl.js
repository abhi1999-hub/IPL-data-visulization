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
function topTenEcoBowler2015(database){
    const query="SELECT deliveries.bowler, sum(deliveries.total_runs-deliveries.bye_runs-deliveries.legbye_runs)/(count(a1.id)/6) AS econamy FROM deliveries LEFT JOIN (SELECT * FROM deliveries WHERE noball_runs=0 and wide_runs=0) AS a1 ON deliveries.id=a1.id WHERE deliveries.match_id in (SELECT id FROM matches WHERE season=2015) GROUP BY(deliveries.bowler) ORDER BY econamy LIMIT 10"
     
    connectdatabase(database,query).then((output)=>fs.writeFile('..//output//TopTenEcoBowlers.json',JSON.stringify(output), (err)=>
    console.log("TopTenECOBowlers2015 File written")))

}
module.exports.noOfMatchesPerYear=noOfMatchesPerYear;
module.exports.noOfMatchWonPerYear=noOfMatchWonPerYear;
module.exports.extraRuns2016=extraRuns2016;
module.exports.topTenEcoBowler2015=topTenEcoBowler2015;