var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');
var path = require('path');

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

// var port = new SerialPort('/dev/tty.usbmodem142401',{ 
//     baudRate: 9600,
//     dataBits: 8,
//     parity: 'none',
//     stopBits: 1,
//     flowControl: false
// });
// 
// port.pipe(parser);

var app = http.createServer(function(req, response) {
    var filePath = '.' + req.url;
    if (filePath == './')
        filePath = './index.html';
    console.log('request starting...',filePath);

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
});

var io = require('socket.io').listen(app);

io.on('connection', function(socket) {
    
    //console.log('Node is listening to port');
    
});

parser.on('data', function(data) {

    console.log('Received data from port: '+  data);
    
    io.emit('arduino', data);
    
});

app.listen(3000);
