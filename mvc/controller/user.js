// function to get all users
const User = require("../model/user");
async function handlegetallusers(req,res) {
    const alldbusers = await User.find({});
  const html = `<ul> ${alldbusers.map((user)=>`<li>${user.firstname}-${user.email}</li>`).join("")} </ul>`
  
  
  res.send(html);
}
// functions to  add data to databade
async function addatatodatabase(req,res) {
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
}
// updating data in database
async function updatedataindatabase(req,res) {
  await User.findByIdAndUpdate(req.params.id,{lastname:"changed"});
  return res.json({msg:"sucessfully updated"});
}
//deleting data in database
async function deletedataindatabase(req,res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({msg:"sucessfully deleted"});
}
module.exports = {

handlegetallusers,addatatodatabase,updatedataindatabase,deletedataindatabase


};