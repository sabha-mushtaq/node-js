const express = require('express');
const app = express();
const cookieparser = require('cookie-parser');
require('dotenv').config();
app.use(cookieparser())
const databaseconnect = require('./model/model.js');
databaseconnect();
module.exports= app;