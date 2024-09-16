// requiring express
const express = require('express');
const call = express();

// middleware for parsing JSON
call.use(express.json());
// 2nd middleware to parse datasend
call.use(express.urlencoded({ extended: true }));

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

// connecting to mongoose
mongoose.connect("mongodb://127.0.0.1:27017/myfirstexpress-db")
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Mongoose error', err));

// adding data to the database
call.post("/post", async (req, res) => {
  const body = req.body;

  // Check if all required fields are provided
  if (!body.firstname || !body.lastname || !body.email || !body.rollno) {
    return res.status(404).json({ msg: "All fields are required" });
  }

  try {
    // Create a new user in the database
    await User.create({
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      rollno: body.rollno,
    });
    console.log(req.body);
    
    return res.status(202).json({ msg: "Success" });
   
    

  } catch (error) {
    // Handle potential errors during user creation
    console.error("Error while adding user:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});
// getting data from database
call.get("/fetchdata",async(req,res)=>{
const alldbusers = await User.find({});
const html = `<ul> ${alldbusers.map((user)=>`<li>${user.firstname}-${user.email}</li>`).join("")} </ul>`


res.send(html);



})
// updating data of database
call.patch("/patch/:id",async (req,res)=>{
await User.findByIdAndUpdate(req.params.id,{lastname:"changed"});
return res.json({msg:"sucessfully updated"});


})
//deleting data from database
call.delete("/delete/:id",async(req,res)=>{

await User.findByIdAndDelete(req.params.id);
return res.json({msg:"sucessfully deleted"});


})

// listening server on localhost 8000
call.listen(8000, () => {
  console.log('Your server is running on localhost 8000');
});
