var app = require('../app');
var http = require('http');
var port = '3000';
app.set('port', port);

var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    throw error;
}

function onListening() {
    var addr = server.address();
    console.log('Listening on port ' + addr.port);
}
