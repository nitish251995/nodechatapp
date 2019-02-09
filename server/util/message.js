var moment =require('moment');

var generatemessage =(from,text)=>
{return {
  from,
text,
createdat: moment().valueOf()};

};
var generatelocationmessage=(from,latitude,longitude)=>
{return {
  from,
  url:`https://www.google.com/maps?q=${latitude},${longitude}`,
  createdat:moment().valueOf()
};

};
module.exports= {generatemessage,generatelocationmessage};
