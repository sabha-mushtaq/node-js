// in this module we are connecting mongo db to the routes

const mongoose = require("mongoose");
async function connectmongodb(url){
return mongoose.connect(url);



}
module.exports ={
connectmongodb

};