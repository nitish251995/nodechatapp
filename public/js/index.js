var socket=io();
socket.on('connect',function()
{console.log('connected to server');


});
socket.on('disconnect',function()
{console.log('disconnected');

});
socket.on('newmessage',function(newmessage)
{
console.log('new message',newmessage);
});
