const path=require('path');
const express= require('express');
const port =process.env.PORT||3000;

const publicpath=path.join(__dirname,'../public');
//console.log(__dirname+'/../public');
console.log(publicpath);
var app =express();
app.use(express.static(publicpath));
app.listen(3000,()=>
{
  console.log(`SERVER IS UP ON ${port}`);
});
