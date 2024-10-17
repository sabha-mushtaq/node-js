const express = require('express');

const app =require('./app.js');
require('dotenv').config();

const port = process.env.port || 5001; 
const authrouter = require('./authroute.js');
app.use(express.json());
app.use('/api/auth',authrouter);
app.listen(port,()=>{

console.log(`server  is sucessfully listening on port ${port}`);



})