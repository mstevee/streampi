var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var globals = require('globals');
globals.status = "off";
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
socket.on('startstream',function(){
  if(globals.status != "on"){
    globals.proc = require('child_process').exec('sh stream1.sh');
    globals.status = "on";
    console.log("start stream");
  }
})
socket.on('stopstream',function(){
  if(globals.status != "off"){
    globals.proc.kill();
    globals.status = "off";
    console.log("stop stream");
  }
})
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});
    
