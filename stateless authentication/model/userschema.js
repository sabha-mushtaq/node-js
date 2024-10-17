const mongoose = require('mongoose');
const jwtToken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
// Define the schema for the User model
const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,'user name is required'], // You can add validation if needed
minlength:[5,'name must be at least 5 char'],
maxlength:[50,'name must be less than 50 char']
  },
  email: {
    type: String,
    required: true, // Add validation to make the field mandatory
    unique: [true,'already exist'], // To ensure email is unique
    lowercase:true,
  },
  password: {
    type: String,
    required: true, // Password should also be mandatory
    select :false,
  },
  confirmpassword: {
    type: String,
    required: true, // Password should also be mandatory
    select :false,
  },
  forgotpasswordtoken: {
    type: String, // This will store the token for resetting password
  },
  forgotpasswordexpirydate: {
    type: Date, // This will store the expiry date of the reset token
  },
}, {
  timestamps: true // Automatically create `createdAt` and `updatedAt` timestamps
});
// encrypting password
userschema.pre('save',async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = await bcrypt.hash(this.password,10) 
  return next();

})
// generating jwttoken
userschema.methods={
jwtToken(){
return jwtToken.sign(
{id: this._id, email : this.email},
process.env.API_KEY,
{expiresIn : '24h'},

)



}




}
// Create the model from the schema
const usermodel = mongoose.model('User', userschema);

// Export the model to use it in other files
module.exports = usermodel;
