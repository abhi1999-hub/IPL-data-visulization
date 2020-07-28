function featchData(url){
    return fetch(url)
    
}
function convertDataFormat(d){
    let data=[]
     for(let i in d){
        data.push([i,d[i]])
     }
     return data
}
featchData("matchesPerYear.json").then(res => res.json())
/*.then((data)=>convertDataFormat(data))
.then((data)=>drawPieChart(data))
.catch((error)=>console.log(error));*/