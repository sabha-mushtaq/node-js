const express = require('express');
const { signup ,signin,getuser,logout} = require('./controllers/authcontroller');
const {jwt} = require('./middleware/jwtauth')
const authrouter = express.Router();
authrouter.post('/signup',signup)
authrouter.post('/signin',signin);
authrouter.get('/user',jwt,getuser)
authrouter.get('/logout',jwt,logout)
module.exports = authrouter;