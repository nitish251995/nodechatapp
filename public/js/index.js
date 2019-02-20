var socket=io();
function scrolltobottom()
{
var messages=jQuery('#messages');
var newmessages=messages.children('li:Last-child');
var clientheight =messages.prop('clientHeight');
var scroltop=messages.prop('scrollTop');
var scrolheight=messages.prop('scrollHeight');
var newmessagesheight=newmessages.innerHeight();
var lastmessageheight=newmessages.prev().innerHeight();
if(clientheight+scroltop+newmessagesheight+lastmessageheight>=scrolheight)
{
  messages.scrollTop(scrollHeight);
}
}
socket.on('connect',function()
{console.log('connected to server');


});
socket.on('disconnect',function()
{console.log('disconnected');

});
socket.on('newmessage',function(newmessage)
{var formattedtime=moment(newmessage.format).format('h:mm a');
console.log('new message',newmessage);
var li =jQuery('<li></li>');
li.text(`${newmessage.from}: ${newmessage.text} ${formattedtime}`);
//li.append(formattedtime);
jQuery('#messages').append(li);
scrolltobottom();
});
socket.on('newlocatonmessage',function(message)
{var formattedtime=moment(message.format).format('h:mm a');
  var li =jQuery('<li></li>');
var a=jQuery('<a target="_blank">My current location</a>');
li.text(`${message.from} ${formattedtime}`);
a.attr('href',message.url);
li.append(a);
jQuery('#messages').append(li);
scrolltobottom();

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
