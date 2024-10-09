const express = require('express');
const router = express.Router();
const {signupindb}= require('./controllers/signup.js');
const {login}= require('./controllers/login.js');
const{restricttologgedinuseronly} = require('./controllers/middleware.js');
router.get('/signup', (req, res) => {
    res.render('signup'); 
  });
router.post('/signup',signupindb);
router.get('/login',(req,res)=>{
res.render('login');




})
router.post('/login',login)
router.get('/home',restricttologgedinuseronly,(req,res)=>{

res.render('home')


})



module.exports= router;
