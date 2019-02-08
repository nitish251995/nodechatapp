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
socket.on('newlocatonmessage',function(message)
{var li =jQuery('<li></li>');
var a=jQuery('<a target="_blank">My current location</a>');
li.text(`${message.from}`);
a.attr('href',message.url);
li.append(a);
jQuery('#messages').append(li);

});

jQuery('#message-form').on('submit',function(e)
{var messagetextbox=jQuery('[name="message"]');
e.preventDefault();
socket.emit('createmessage',{
  from :"andrew",
  text:  messagetextbox.val()

},function()
{messagetextbox.val('')
});
});


var buttonlocation =jQuery('#sendlocation');
buttonlocation.on('click',function()
{if(!navigator.geolocation)
  {
    return alert('geolocation not found');
  }
  buttonlocation.attr('disabled','disabled').text('Sendinglocation...');
  navigator.geolocation.getCurrentPosition(function(position)
{buttonlocation.removeAttr('disabled').text('Send location');
  console.log(position);
  socket.emit('createlocationmessage',{
  latitude:position.coords.latitude,
  longitude:position.coords.longitude
});
},function()
{buttonlocation.removeAttr('disabled').text('Send location');
  alert('geolocation not found')});
});
