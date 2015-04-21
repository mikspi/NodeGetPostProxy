var express = require('express');
var app = express();
var http = require('http');
var httpProxy = require('node-get-post-proxy');


var proxy_development = httpProxy.createProxyServer({
  target: "http://localhost:81"
});

var proxy_staging = httpProxy.createProxyServer({
  target: "http://localhost:82"
});



app.use(function(req,res,next){
	console.log(req.param('user_name'));

    if (req.param('user_name')=='Pippo'){
      console.log(proxy_development);
      proxy_development.web(req,res);
    } else if (req.param('user_name')=='Mario'){
      proxy_staging.web(req,res);
    } else {
      return next();
    }
});

app.get('/', function (req, res) {
  res.send('I am the production server!')
})

http.createServer(app).listen(80);
console.log('Listening on port 80...');