const { getuser } = require('../controllers/authentication.js'); 



async function restricttologgedinuseronly(req, res, next) {
    const userId = req.cookies.uuid; // Ensure this matches the cookie you set during login
    if (!userId) {
        return res.redirect("/login"); // Redirect to login if there's no user ID
    }
    
    try {
        const user = await getuser(userId); // Use await if getuser is async
        if (!user) {
            return res.redirect("/login"); // Redirect if the user is not found
        }
        req.user = user; // Attach the user to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error('Error retrieving user:', err);
        return res.status(500).send('Server error'); // Handle server errors
    }
}

module.exports = {
    restricttologgedinuseronly
};
