const mysql=require('mysql');
const { result }=require("./config.js")
const database=mysql.createConnection({
    host :result.parsed.host,
    user:result.parsed.user,
    password:result.parsed.password,
    database:result.parsed.db

});

database.connect((err)=>{
    if(err){
        console.log(err)
    }
    console.log("database connect")
})