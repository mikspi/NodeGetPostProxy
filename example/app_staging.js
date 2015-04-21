var express = require('express');
var app = express();
var http = require('http');


app.get('/', function (req, res) {
  res.send('Hi '+req.param('user_name')+', you are connected to the staging server!');
})

http.createServer(app).listen(82);
console.log('Listening on port 82...');