let express = require('express')

let app = express()

//app.get('/', (request, response)=>{
   // response.send("Welcome to API with express")
//})

app.get('/json', (request, response)=>{
    console.log(request)
})

app.listen(1234, ()=>{
    console.log("Listen at 1234")
})
