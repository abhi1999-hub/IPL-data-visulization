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

function bowlereco(deliveries,id2015,end){
    let e={}
    deliveries.forEach( a=> {
        if(a.match_id >=id2015+1 && a.match_id<=(id2015+end)){
          if(!e.hasOwnProperty(a.bowler)){
                  e[a.bowler]={}
                  e[a.bowler]["runs"]=0;
                  e[a.bowler]["balls"]=0;
          }
          else{
              e[a.bowler]["runs"]+=a.total_runs;
              e[a.bowler]["balls"]+=1;
          }
        }
    });
    let sort1=[]; 
   for(let i in e){
        temp=e[i]["runs"]/(e[i]["balls"]/6)
        sort1.push([i,parseFloat(temp.toFixed(2))])
    }
    //console.log(sort1)
    let sorted=sort1.sort( (a,b) =>{
        return a[1]-b[1];
    });
    //console.log(sorted)
    let  out4={};
    for(let j=0;j<10;j++){
        out4[sorted[j][0]]=sorted[j][1];
    }
    //console.log(out4)
    return out4;
}
module.exports.noOfMatchesPerYear=noOfMatchesPerYear;
module.exports.noOfMatchWonPerYear=noOfMatchWonPerYear;
module.exports.extraruns=extraruns;
module.exports.bowlereco=bowlereco;
