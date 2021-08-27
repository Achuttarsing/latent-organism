var express = require('express');
var http = require('http');
var fs = require('fs');
var index = fs.readFileSync( 'index.html');

//var server = express(); // better instead
//app.use(express.static('.'));

// // opencv
// const spawn = require('child_process').spawn;
// const readline = require('readline');    
// 
// // Spawn a new process to run Python 3 running example.py
// // proc = spawn('python', ['camera2.py'], {
// //     detached: true,
// // });
// proc = spawn('source execute_body_tracking.sh', {
//     shell: true,
// });
// 
// // Create a line reader interface connected to the process stdout and stdin
// var lineReader = readline.createInterface({
//   input: proc.stdout,
//   output: proc.stdin,
//   terminal: false
// });
// 
// // The line reade emits lines when it finds them in the incomming stream.
// lineReader.on('line', function(line){
// 
//     // Do what you want with the number.
//     //console.log(line)
//     io.emit('user_position', line);
// })
// 
// proc.on('close', (code, signal) => {
//     console.log(`child process closed with code ${code} and signal ${signal}`);
// });
// 
// 
// // opencv


var SerialPort = require('serialport');
const parsers = SerialPort.parsers;

const parser = new parsers.Readline({
    delimiter: '\r\n'
});

var port = new SerialPort('/dev/tty.usbmodem142401',{ 
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

port.pipe(parser);

var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

var io = require('socket.io').listen(app);

io.on('connection', function(socket) {
    
    //console.log('Node is listening to port');
    
});

parser.on('data', function(data) {

    console.log('Received data from port: '+  data);
    
    io.emit('arduino', data);
    
});

//app.use(express.static('.'));
app.listen(3000);
