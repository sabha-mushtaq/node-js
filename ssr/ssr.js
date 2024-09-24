const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = 9000;

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/myfirstdbinmongo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log('MongoDB connection error:', error));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// Define the Student Schema
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    standard: { type: String, required: true },
    marks: { type: Number, required: true }, // Change to Number for proper numeric operations
    rollno: { type: Number, required: true }
});

// Create the Student Model
const Student = mongoose.model('Student', studentSchema);

// Route to display all students
app.get('/', async (req, res) => {
    try {
        const allnames = await Student.find({}); // Use Student instead of students
        return res.render("home", {
            names: allnames,
        });
    } catch (error) {
        console.log('Error fetching students:', error);
        return res.status(500).send("Internal Server Error");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is successfully listening on port: ${port}`);
});




