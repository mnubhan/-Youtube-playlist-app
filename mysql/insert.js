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

    let query = "insert into youtube (youtubeid,category) value ?"
    let bulkvalue = [
        ['nJ9NtykqIj0', 'news'],
        ['GgMncA9XNkM', 'sport'],
        ['UFnuF0KctxU', 'news'],
        ['BvRibG_w0hM', 'game'],
        ['EsC4J6MVbSc', 'food'],
        ['gnkrDse9QKc', 'education']
    ]
    connectionobject.query(query, [bulkvalue], (error, result)=>{
        if(error){
            throw error
        }
        console.log(result)
        console.log("Insert bulk is succes")
    })
})