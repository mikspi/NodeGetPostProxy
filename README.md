#NodeGetPostProxy

### When to use NodeGetPostProxy

Problem:

Suppose you have a mobile application in which the back-end address is hardcoded. Suppose you also have multiple server instances:
- production: users connect to it
- development: developers connect to it to test new features (to connect to it you have to change the hardcoded back-end address in the mobile application)
- staging: you want that a sample of the users connect to it in order to do an A/B testing

Solution:

Your application has a login. You can decide to which server a user connect basing on its username.

The solution with this module is to let the production server to act as a Proxy. If the user who does the request has to connect to the staging server, because its field "server" in the database is set to "staging", the production server does the request for him (with the get or post fields) and it will return the response.

The module automatically understand if the request was a GET or a POST and forward the GET or POST fields.


### Installing NodeGetPostProxy

```
npm install nodegetpostproxy
```

### How to use it

```
var express = require('express');
var app = express();
var http = require('http');
var httpProxy = require('NodeGetPostProxy');


var proxy = httpProxy.createProxyServer({
  target: "http://...." //link of the development server
});


app.use(function(req,res,next){
    if (req.params('user_name') == 'Pippo'){
      proxy.web(req,res);
    } else {
      return next();
    }
});

app.get('/', function (req, res) {
  res.send('I am the production server!')
})

http.createServer(app).listen(80);
console.log('Listening on port 80...');

```

### Run the example

You can find an example in the folder "example".

In 3 different terminal windows run:
- node app.js
- node app_development.js
- node app_staging.js

Go to the browser:

With the link http://localhost will response the production server
With the link http://localhost/?user_name=Pippo will response the development server
With the link http://localhost/?user_name=Mario will response the staging server
