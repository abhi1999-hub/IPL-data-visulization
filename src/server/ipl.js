function noOfMatchesPerYear(matches){
    let noOfMatches={}
    matches.forEach( a => {
        if(noOfMatches.hasOwnProperty(a.season)){
            noOfMatches[a.season]+=1;
        }
        else{
            noOfMatches[a.season]=1;
        }
    });
    return noOfMatches
}



function noOfMatchWonPerYear(matches){
    let noOfMatchesWon={}
    matches.forEach( a => {
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
    });
    return noOfMatchesWon;
}


function extraRuns2016(deliveries,id2016,end){
    let extraruns={}
    deliveries.forEach( a =>{
      if(a.match_id >=id2016+1 && a.match_id<=(end)){
        if(extraruns[a.bowling_team]){
            extraruns[a.bowling_team]+=a.extra_runs;
        }
        else{
            extraruns[a.bowling_team]=a.extra_runs;
        }
    }
    });
    return extraruns;
}



function topTenEcoBowler2015(deliveries,id2015,end){
    let TotalRunsAndBalls={}
    deliveries.forEach( a=> {
        if(a.match_id >=id2015+1 && a.match_id<=end){
          if(!TotalRunsAndBalls.hasOwnProperty(a["bowler"])){
                TotalRunsAndBalls[a["bowler"]]={}
                TotalRunsAndBalls[a["bowler"]]["runs"]=a.total_runs-a.bye_runs-a.legbye_runs
                if(a.noball_runs==0 && a.wide_runs==0){
                    TotalRunsAndBalls[a["bowler"]]["balls"]=1;
                }
                else {
                    TotalRunsAndBalls[a["bowler"]]["balls"]=0;
                }
                 
          }
          else{
              TotalRunsAndBalls[a["bowler"]]["runs"]+=a.total_runs-a.bye_runs-a.legbye_runs
              if(a.noball_runs==0 && a.wide_runs==0){
                TotalRunsAndBalls[a["bowler"]]["balls"]+=1;
              }
          }
        }
    });
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
    console.log(topTenEcoBowlers)
    return topTenEcoBowlers;
}


//exporting modules
module.exports.noOfMatchesPerYear=noOfMatchesPerYear;
module.exports.noOfMatchWonPerYear=noOfMatchWonPerYear;
module.exports.extraRuns2016=extraRuns2016;
module.exports.topTenEcoBowler2015=topTenEcoBowler2015;
