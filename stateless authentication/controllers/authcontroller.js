const usermodel = require('../model/userschema.js');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
require('dotenv').config();

const signup = async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;

  // Log input data
  console.log(name, email, password, confirmpassword);
// check if required fields are entered
if (!name || !email || !password || !confirmpassword ) {
  return res.status(400).json({
sucess : false,
message : 'Every field is required'



  })
}
// check validity of entered email
const validemail = emailValidator.validate(email);
if (!validemail) {
  return res.status(400).json({
sucess: false,

message :'Enter valid email',


  })
};
  // Check if passwords match
  if ( password !== confirmpassword) {
    return res.status(400).json({
      success: false,
      message: 'Passwords do not match',
    });
  }

  try {
    // Create new user instance
    const userinfo = new usermodel({ name, email, password,confirmpassword });

    // Save the user in the database
    const result = await userinfo.save();

    // Return success response with user data (excluding password)
    return res.status(200).json({
      success: true,
      data: {
        id: result._id,
        name: result.name,
        email: result.email,
      },
    });
  } catch (e) {
    // Handle duplicate email error
    if (e.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
      });
    }

    // Catch-all error handler for other issues
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }

};
const signin = async (req, res) => {
 try{ const { email, password } = req.body;
  let user = await usermodel.findOne({ email }).select('+password');

  if (!user || !(await bcrypt.compare(password ,user.password))) {
    return res.status(500).json({
      success: false,
      message: 'Invalid credentials',
    });
  }
  const token = user.jwtToken() ;
  user.password = null;
  const cookieOption = {
maxAge : 24 * 60 * 60 * 1000,
httpOnly : true,



  }
 
  res.cookie("token",token,cookieOption)
  return res.status(200).json({
    success: true,
    data:user
   
  });
 }catch(e){
return res.status(400).json({
sucess: false,
message: e.message



})



 }
};
// route to get user
const getuser = async (req,res)=>{

const userid = req.user.id;
try {
  const user = await usermodel.findById(userid);
  return res.status(200).json({
sucess:true,
data : user,


  })
} catch (e) {
  return res.status(400).json({

sucess : false,
message :e.message

  })
}



}
// function to logout a user
const logout = (req,res)=>{

try {
  const cookieoption ={
expires : new Date(),
httpOnle : true


  }
  res.cookie("token",null,cookieoption)
  res.status(200).json({
sucess: true,
message : 'sucessfully loggedout'



  })
} catch (e) {
  res.status(400).json({
    sucess: false,
    message : e.message
    
    
    
      })
}



}

module.exports = {
  signup,
  signin,
  getuser,
  logout

};

