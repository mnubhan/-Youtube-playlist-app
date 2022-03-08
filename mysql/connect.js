let mysql = require("mysql2")

let connectionobject = mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'',
    database:'video'
})

connectionobject.connect((error)=>{
    if(error) {
        throw error
    }
    console.log("connection success")

    let query = "select * from video"
    connectionobject.query(query, (error, data)=>{
        if(error){
            throw error
        }
        console.log(data)
    })
})