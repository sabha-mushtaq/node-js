
const myapp = require('express');
const app = myapp();
const users = require("./MOCK_DATA.json");
const fs = require('fs');
const { log } = require('console');

// Middleware to parse form data
app.use(myapp.urlencoded({ extended: false }));
app.use(myapp.json()); // For parsing JSON data in POST requests
// making a middleware
app.use((req,res,next)=>{
console.log('hello i am first middleware');
req.username='sabha'
next();
});
app.use((req,res,next)=>{

console.log('hello i am 2nd middleware',req.username);
next();


})
app.use((req, res, next) => {
    fs.appendFile('log.txt', `\n${Date.now()}:${req.method}`, (err) => {
        if (err) {
            console.log('Logging unsuccessful');
        } else {
            console.log('Logging successful');
        }
    });
    next(); // Continue to the next middleware or route handler
});



// Routes

// First route for rendering a JSON file
app.get('/api/users', (req, res) => {
    return res.json(users);
});


// Second route for rendering an HTML file
app.get('/users', (req, res) => {
    const html = `<ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`;

    // Set the custom header
    res.setHeader("myname", "sabha mushtaq");

    // Log headers to ensure "myname" is present
    console.log(res.getHeaders());  // Log headers before sending the response

    // Send the response
    res.send(html);
});


// Third route for rendering particular data from JSON file
app.get('/api/users/:id', (req, res) => {
    let id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (user) {
        return res.json(user);
    } else {
        return res.status(404).json({ message: "User not found" });
    }
});

// Fourth POST request route
app.post('/api/users', (req, res) => {
    const Body = req.body;

    // Add new user with an auto-incremented ID
    users.push({ ...Body, id: users.length + 1 });

    // Write the updated users array back to MOCK_DATA.json
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            // If there is an error writing to the file, send an error response
            return res.status(500).json({ status: "error", message: "Failed to write data" });
        }
        // Send success response
        return res.json({ status: "success", message: "User added successfully" });
    });
});


// Listen on the website in the browser
app.listen(2000, () => {
    console.log('Server is running on http://localhost:2000');
});
