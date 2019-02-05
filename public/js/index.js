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
var li =jQuery('<li></li>');
li.text(`${newmessage.from}: ${newmessage.text}`);
jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function(e)
{
e.preventDefault();
socket.emit('createmessage',{
  from :"andrew",
  text:  jQuery('[name=message]').val()
},function()
{console.log();
});
});
