// requiring mongoose
const mongoose = require('mongoose');
// creating a schema
const userschema = new mongoose.Schema({
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    rollno: {
      type: Number,
    }
  },{
  timestamps:true
  
  });
  // creating a model
const User = mongoose.model('User', userschema);
module.exports = User;