var generatemessage =(from,text)=>
{return {
  from,
text,
createdat: new Date().getTime};

};
var generatelocationmessage=(from,latitude,longitude)=>
{return {
  from,
  url:`https://www.google.com/maps?q=${latitude},${longitude}`,
  createdat:new Date().getTime()
};

};
module.exports= {generatemessage,generatelocationmessage};
