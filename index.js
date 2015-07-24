var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('initRounds', function(params){


        console.log(params);

        request(
            {url: 'https://api.crowdscores.com/api/v1/rounds/'},
            function (err, res, rounds) {
                var obj = JSON.parse(rounds);
                var result = [];
                var count = 0;
                obj.forEach(function(data) {
                    if (data.name == params.name && data.schedStart >= params.start) {
                        result[count] = data;
                        count++;
                        console.log(data);
                    }
                });

                io.emit('rounds', result);
            }
        );



    });
});

var server = http.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("App is listening at http://%s:%s", host, port);
})