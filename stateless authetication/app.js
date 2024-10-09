const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const {connecttodb}= require('./controllers/connection.js');
connecttodb('mongodb://127.0.0.1:27017/mysignup');
app.set('view engine','ejs');
const user = require('./routes.js');
app.use('/',user);
app.listen(9000,(req,res)=>{

console.log('server is working on port 9000');



});
