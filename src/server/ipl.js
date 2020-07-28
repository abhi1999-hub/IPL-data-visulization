function noOfMatchesPerYear(matches){
    let noOfMatches=matches.reduce((accumulator,a)=>{
        if(accumulator.hasOwnProperty(a.season)){
            accumulator[a.season]+=1;
        }
        else{
            accumulator[a.season]=1;
        }
        return accumulator;
    },{});
    return noOfMatches
}
function noOfMatchWonPerYear(matches){
    let result=matches.reduce((noOfMatchesWon,a)=>{
        if(a.result==='normal'){
            if(!noOfMatchesWon.hasOwnProperty(a.season)){
                noOfMatchesWon[a.season]={}
                noOfMatchesWon[a.season][a.winner]=0;
            }
            if(noOfMatchesWon.hasOwnProperty(a.season) && noOfMatchesWon[a.season].hasOwnProperty(a.winner)){
                noOfMatchesWon[a.season][a.winner]+=1;
            }
            else{
                noOfMatchesWon[a.season][a.winner]=1;
            }
        }
        return noOfMatchesWon; 
    },{})
    return result;
}
function extraRuns2016(deliveries,id2016,end){
    let extraruns=deliveries.reduce((accumulator,a)=>{
        if(a.match_id >=id2016+1 && a.match_id<=(end)){
            if(accumulator[a.bowling_team]){
                accumulator[a.bowling_team]+=a.extra_runs;
            }
            else{
                accumulator[a.bowling_team]=a.extra_runs;
            }
            
    }
    return accumulator;
},{})
   return extraruns;
}

function topTenEcoBowler2015(deliveries,id2015,end){
    let TotalRunsAndBalls=deliveries.reduce((accumulator,a)=> {
        if(a.match_id >=id2015+1 && a.match_id<=end){
          if(!accumulator.hasOwnProperty(a["bowler"])){
                accumulator[a["bowler"]]={}
                accumulator[a["bowler"]]["runs"]=a.total_runs-a.bye_runs-a.legbye_runs
                if(a.noball_runs==0 && a.wide_runs==0){
                    accumulator[a["bowler"]]["balls"]=1;
                }
                else {
                    accumulator[a["bowler"]]["balls"]=0;
                }
                 
          }
          else{
               accumulator[a["bowler"]]["runs"]+=a.total_runs-a.bye_runs-a.legbye_runs
               if(a.noball_runs==0 && a.wide_runs==0){
                accumulator[a["bowler"]]["balls"]+=1;
              }
          }
        }
        return accumulator;
    },{});
    let totalRunsandOvers=[]; 
    for(let i in TotalRunsAndBalls){
        temp=TotalRunsAndBalls[i]["runs"]/(TotalRunsAndBalls[i]["balls"]/6)
        totalRunsandOvers.push([i,parseFloat(temp.toFixed(2))])
    }
    let sortedArray=totalRunsandOvers.sort( (a,b) =>{
        return a[1]-b[1];
    });
    
    let  topTenEcoBowlers={};
    for(let j=0;j<10;j++){
        topTenEcoBowlers[sortedArray[j][0]]=sortedArray[j][1];
    }
    return topTenEcoBowlers;
}
module.exports.noOfMatchesPerYear=noOfMatchesPerYear;
module.exports.noOfMatchWonPerYear=noOfMatchWonPerYear;
module.exports.extraRuns2016=extraRuns2016;
module.exports.topTenEcoBowler2015=topTenEcoBowler2015;
