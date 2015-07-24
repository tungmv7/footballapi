var express = require("express");
var app = express();

app.get('/', function(req, res){
    res.send("Hello Tung. Homepage");
});

app.get('/list', function(req, res){
    res.send("This is list items");
})

var server = app.listen(3001, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("App is listening at http://%s:%s", host, port);
})