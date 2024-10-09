const user = require('../model/model'); // Import your user model
const { v4: uuidv4 } = require('uuid'); // Import uuid to generate a UUID

// Define the signup function
async function signupindb(req, res) {
  try {
    // Extract user details from request body
    const { name, email, password } = req.body;

    // Generate a new UUID
    const uuid = uuidv4();

    // Create a new user with the generated UUID and other details
    await user.create({
      name,
      email,
      password,
      uuid,
    });

    // Send a success response
    return res.send('Successfully signed up');
    
  } catch (err) {
    // Handle errors and send an error response
    console.error('Could not sign up:', err);
    return res.status(500).send('Error signing up');
  }
}

module.exports = { signupindb }; // Export the function so you can use it in your route
