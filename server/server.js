const path=require('path');
const express= require('express');
const socketIO=require('socket.io');
const http=require('http');
const port =process.env.PORT||3000;
const {generatemessage,generatelocationmessage}=require('./util/message.js');

const publicpath=path.join(__dirname,'../public');
//console.log(__dirname+'/../public');
console.log(publicpath);
var app =express();

var server=http.createServer(app);
var io=socketIO(server);
io.on('connection',(socket)=>
{
console.log('new user connected');
socket.emit('newmessage',generatemessage('admin','welcome to the chat app'));
socket.broadcast.emit('newmessage',generatemessage('admin','newuserjoined'));


socket.on('createmessage',(newmessage,callback)=>
{console.log(newmessage);
io.emit('newmessage',generatemessage(newmessage.from,newmessage.text));

callback('This is from server');

});
socket.on('createlocationmessage',(coords)=>
{io.emit('newlocatonmessage',generatelocationmessage('admin',coords.latitude,coords.longitude));

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
