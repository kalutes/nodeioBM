/**
 * Created by peter on 4/01/16.
 */



var port = 8001;
var http = require('http');
var url  = require('url');
var fs   = require('fs');
var io   = require('socket.io')
var i    = 0;

var server = http.createServer(function (request, response) {

    var path = url.parse(request.url).pathname;


    switch (path) {
        case '/':
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write('Hi this is from Nawfal with request number =' + (i++));
            response.end();
            break;
        case '/socket.html':
            fs.readFile(__dirname + path, function (error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write('Opps, this doesnt exist - 404');
                    response.end();
                } else {
                    response.writeHead(200, {"Content-type:": "text/html"});
                    response.write(data, "utf8");
                    response.end();
                }
            });
            break;
        default:
            response.writeHead(404);
            response.write('Opps, this doesnt exist - 404');
            response.end();
            break;
    }


    //  console.log(request);
});

server.listen(port);
var listerner = io.listen(server);
listerner.sockets.on('connection', function (socket) {
   // console.log('We got a connection');
    socket.emit('message', {'message': 'Hi this is Nawfal from Socket IO and the time right now is :' + Date.now()});

    socket.on('client_data', function (data) {
        console.log(data.letter);
    });
});