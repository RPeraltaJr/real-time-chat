var app = require('express')(); // express framework
var http = require('http').Server(app); // server
var io = require('socket.io')(http); // socket.io

app.get('/', function(request, response) {
   response.sendFile(__dirname + '/index.html'),
   response.sendFile(__dirname + 'styles.css');
});

io.on('connection', function(socket) {
    var user = Date.now(); // username
    
    // listen for an event and emit message
    socket.on('message.sent', function(message) {
        io.emit('message', user + ': ' + message);
    });
    
    io.emit('message', 'User ' + user + ' connected');
});

// Choose a port number (ex. 3000)
http.listen(3000, function() {
    console.log('Started server...');
});