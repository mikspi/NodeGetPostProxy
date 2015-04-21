var express = require('express');
var app = express();
var http = require('http');


app.get('/', function (req, res) {
  res.send('Hi '+req.param('user_name')+', you are connected to the development server!');
})

http.createServer(app).listen(81);
console.log('Listening on port 81...');