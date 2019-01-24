const path=require('path');
const express= require('express');
const socketIO=require('socket.io');
const http=require('http');
const port =process.env.PORT||3000;

const publicpath=path.join(__dirname,'../public');
//console.log(__dirname+'/../public');
console.log(publicpath);
var app =express();

var server=http.createServer(app);
var io=socketIO(server);
io.on('connection',(socket)=>
{
console.log('new user connected');
socket.emit('newmessage',{
  from :'mike',
  text: 'hey what is going on',
  createdat:123
});

socket.on('createmessageevent',(newmessage)=>
{console.log(newmessage);

});




socket.on('disconnect',()=>
{
  console.log('Disconnected');
});
});
app.use(express.static(publicpath));
server.listen(3000,()=>
{
  console.log(`SERVER IS UP ON ${port}`);
});
