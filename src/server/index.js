const mysql=require('mysql');
const { result }=require("./config.js")
const func= require('./ipl')
const database=mysql.createConnection({
    host :result.parsed.host,
    user:result.parsed.user,
    password:result.parsed.password,
    database:result.parsed.db

});
const connectDatabase = ()=>{
    return new Promise((reject,resolve)=>{
    database.connect((err)=>{
      if(err){
        reject(err)
      }
       resolve("database connect")
    })
})
}
connectDatabase().then((output)=>{
    console.log(output)
}).catch(console.log)
func.noOfMatchesPerYear(database)
//func.noOfMatchWonPerYear(database)
//func.extraRuns2016(database)
//func.topTenEcoBowler2015(database)
database.end()