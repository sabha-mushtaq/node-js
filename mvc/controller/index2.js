// requiring express
const express = require('express');
const call = express();
// calling get controller function
const controller = require('./controller/user');
// logging file connection
const { logreqres} = require("./middlewares");

// middleware for parsing JSON
call.use(express.json());
// 2nd middleware to parse datasend
call.use(express.urlencoded({ extended: true }));
// importing router file
const userRouter = require("./routes/user");

// connecting mongodb
const {connectmongodb} = require("./connection");
const router = require('./routes/user');
connectmongodb("mongodb://127.0.0.1:27017/myfirstexpress-db")
// calling logregres
call.use(logreqres('log.txt'));

// calling router(will give  this much part /user by default and rest is written in routes name)
call.use("/user",userRouter);


// listening server on localhost 8000
call.listen(8000, () => {
  console.log('Your server is running on localhost 8000');
});
