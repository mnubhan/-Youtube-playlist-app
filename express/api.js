let express = require('express')
let mysql = require('mysql')
let cors = require('cors')

let connectionconfig = {
    host:'localhost',
    port:'3306',
    user:'root',
    password:'',
    database:'video',
}



// let connectionobject = mysql.createConnection(connectionconfig)


let app = express()

app.use(express.json())

app.use(cors())

app.get('/youtube', (req, res)=>{
    let connectionobject = mysql.createConnection(connectionconfig)
    connectionobject.connect(err=>{
        if(err){
            throw error
        }
        console.log("Connection to database succes"+ JSON.stringify(req.route.path))

        let query = "select * from youtube"
        connectionobject.query(query, (err, data)=>{
            if(err){
                throw err
            }
            //console.log(data)
            //res.send("Connection to database is succes." + "<br>" + "Query is succes")
            res.send(data)
            connectionobject.end(err=>{
                if(err){
                    throw err
                }
                console.log("Connection end")
            })
        })
    })
    
})

app.get("/youtube/id/:myid", (req, res) => {
    //console.log(req)
    console.log(req.params.myid)
    let id = req.params.myid
    //create connection
    let connectionObject = mysql.createConnection(connectionconfig)
    //use connectionObject to conenct to database
    connectionObject.connect(err => {
        if (err)
            throw err
        console.log("Connection to database is success for " + JSON.stringify(req.method) + " " + JSON.stringify(req.route.path))
        //execute the query
        let query = "select * from youtube where id = " + id
        connectionObject.query(query, (err, data) => {
            if (err)
                throw err
            console.log("Response for youtube with id: " + id)
            console.log(data)
            res.send(data)
            connectionObject.end(err => {
                if (err)
                    throw err
                console.log("Connection ended gracefully for " + JSON.stringify(req.method) + " " + req.route.path)
            })
        })
    })

})

// app.get("/youtube/id/:myid", (req, res)=>{
//     // console.log(req);
//     console.log(req.params.myid);
//     let id = req.params.myid
//     let connectionobject = mysql.createConnection(connectionconfig)

//     connectionobject.connect(err=>{
//         if(err)
//          throw err
//         console.log("Connection to database is success"+ JSON.stringify(req.route.path));

//         let query = "select * from youtube where id="+ id

//         connectionobject.query(query, (err,data)=>{
//             if(err){
//                 throw err
//             }
//             // console.log("Response for country with id"+ id);
//             console.log(data);
//             res.send(data)
//             // res.send("Query succes")

//             connectionobject.end(err=>{
//                 if(err){
//                     throw err
//                 }
//                 console.log("Connection ended gracefully for"+ req.route.path );
//             })
//         })
//     })
// })

app.post("/add/youtube", (req, res)=>{
    console.log(req.body);
    let newyoutubeid = req.body

    if(newyoutubeid.youtubeid == "" || 
    newyoutubeid.youtubeid == undefined ||
    newyoutubeid.category == undefined){
        res.send([{
            "status" : "bad request body",
            "requestBodyReceived": req.body,
            "requestBodyExpected": "{'youtubeid':'abc,'category':'abc'}"
        }])
        throw new Error("Bad Request Body")
    }

    let connectionobject = mysql.createConnection(connectionconfig)
    //use connectionObject to conenct to database
    connectionobject.connect(err => {
        if (err)
            throw err
        console.log("Connection to database is success for " + JSON.stringify(req.method) + " " + JSON.stringify(req.route.path))
        //execute the query
        let query = "insert into youtube (youtubeid, category) values(?, ?)" 
        connectionobject.query(query, [newyoutubeid.youtubeid, newyoutubeid.category],(err, data) => {
            if (err)
                throw err
            console.log("Response for add new youtubeid")
            console.log(data)
            //res.send(data)
            if (data.affectedRows === 1) {
                res.send([{
                    "addStatus": "Success",
                    "id": data.insertId,
                    "deleteRowCount": data.affectedRows
                }])
            } else {
                res.send([{
                    "addStatus": "Fail",
                    "id": data.insertId,
                    "addRowCount": data.affectedRows
                }])
            }
            connectionobject.end(err => {
                if (err)
                    throw err
                console.log("Connection ended gracefully for " + JSON.stringify(req.method) + " " + req.route.path)
            })
        })
    })
    
})


app.put("/update/youtube/id/:myid", (req,res)=>{
    console.log("Update youtubewith id: " + req.params.myid)
    console.log("Request body to use for update: ")
    console.log(req.body)
    let youtube = req.body
    if(youtube.youtubeid == "" || 
    youtube.youtubeid == undefined || 
    youtube.category == "" || 
    youtube.category == undefined){
        res.send([{
            "requestBodyReceived": req.body,
            "status":"Bad request body",
            "id": req.params.myid,
            "requestBodyExpected":"{'youtubeid':'abc','category':'abc'}"        
        }])
        //process.exit()
        //do not use process.exit as it will end the node program and
        //then none of the endpoints will work
        throw new Error("Bad request body for " + req.method + " request" )
    }
    let connectionobject = mysql.createConnection(connectionconfig)
    connectionobject.connect(err=>{
        if(err)
            throw err
        console.log("Connection to database is success for" + req.method + " " + req.route.path);
        let query = "update youtube " +
                    "set youtubeid= '" + youtube.youtubeid + "'," +
                    "category = '" + youtube.category + "' " +
                    "where id=" + req.params.myid
        console.log(query);
        connectionobject.query(query, (err, data)=>{

            if(err)
                throw err
            
        if(data.affectedRows >=1 ){
                res.send([
                    {
                        "updateStatus": "Success",
                        "id": req.params.myid,
                        "updateRowCount": data.affectedRows,
                        "message":data.message
                    }
                ])
            }else{
                res.send([
                    {
                        "updateStatus": "Fail",
                        "id": req.params.videoid,
                        "updateRowCount": data.affectedRows,
                        "message":data.message
                    }
                ])
            }

            connectionobject.end(err=>{
                if(err)
                    throw err
                console.log("Connection ended gracefully for" + req.method + " " + req.route.path);

            })
        })
    })

})

// app.put("/update/youtube/id/:myid", (req,res)=>{
//     console.log("Update youtube with id:" + req.params.myid);
//     console.log("Request body to use for update:");
//     console.log(req.body);
    
//     let youtube = req.body
//     if(youtube.youtubeid == "" || 
//     youtube.youtubeid == undefined ||
//     youtube.category == undefined){
//         res.send([{
//             "status" : "bad request body",
//             "requestBodyReceived": req.body,
//             "id": req.params.myid,
//             "requestBodyExpected": "{'youtubeid':'abc,'category':'abc'}"
//         }])
//         throw new Error("Bad Request Body")
//     }



//     res.send("Updating youtube by id:" + req.params.myid)
// })




app.listen(1234,()=>{
    console.log("Listening on port 1234 right now")
})