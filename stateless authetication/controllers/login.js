const user = require('../model/model');
const { v4: uuidv4 } = require('uuid');
const { setuser } = require('../controllers/authentication.js');

async function login(req, res) {
  try {
    const { name, password } = req.body;
    const foundUser = await user.findOne({ name, password });

    if (foundUser) {
      const sessionid = uuidv4();
      setuser(sessionid, foundUser);

      res.cookie('uuid', sessionid, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
      });

      console.log('Successfully logged in');
      return res.status(202).render('home');
    } else {
      console.log('Invalid credentials');
      return res.status(401).send('Invalid credentials');
    }
  } catch (err) {
    console.log('Error logging in:', err);
    return res.status(500).send('Server error');
  }
}

module.exports = {
  login
};

