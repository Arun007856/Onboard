const http = require('http');
const express = require('express');
const app = express();
const router=require('./routes/index.js')
const bodyParser=require('body-parser')

app.use(bodyParser.json());
app.use(express.urlencoded({limit:'100MB',extended:true}))
var port=8080
app.use('/api',router)

const server = http.createServer(app).listen(port ,() => {
      console.log('Server running at http://127.0.0.1:'+port+'/');
    
    })


