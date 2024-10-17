const mongoose = require('mongoose');
const mongodburl = process.env.mongodburl || 'mongodb://127.0.0.1:27017/mypage';
const databaseconnect = () =>{

mongoose.connect(mongodburl).then((conn)=>console.log(`connected to DB:${conn.connection.host}`)
).catch((err)=>console.log(err.message)
)



}
module.exports =

databaseconnect;

