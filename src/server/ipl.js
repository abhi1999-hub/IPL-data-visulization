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
    w={}
    matches.forEach( a => {
    if(a.result==='normal'){
        if(!w.hasOwnProperty(a.season)){
            w[a.season]={}
            w[a.season][a.winner]=0;
        }
        if(w.hasOwnProperty(a.season) && w[a.season].hasOwnProperty(a.winner)){
            w[a.season][a.winner]+=1;
        }
        else{
            w[a.season][a.winner]=1;
        }
    }
    })
    return w;
}
function extraruns(deliveries,id2016,end){
    r={}
    deliveries.forEach( a =>{
      if(a.match_id >=id2016+1 && a.match_id<=(id2016+end)){
        if(r[a.bowling_team]){
            r[a.bowling_team]+=a.extra_runs;
        }
        else{
            r[a.bowling_team]=a.extra_runs;
        }
    }
    });
    return r;
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
