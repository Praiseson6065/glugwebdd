// Import the necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { stringify } = require('querystring');

// Initialize the app
const app = express();

// Use body-parser to parse the form data
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the MongoDB Atlas database
mongoose.connect('mongodb+srv://ps:ps@cluster0.tbkdx2m.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a Mongoose schema for the form data
const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  dept: String,
  rollno : String
});

// Create a Mongoose model for the form data
const FormData = mongoose.model('FormData', formDataSchema);

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname+"/register.html");
});

// Handle form submissions
app.post('/', (req, res) => {
  // Create a new instance of the FormData model
  const formData = new FormData({
    name: req.body.name,
    email: req.body.email,
    dept: req.body.dept,
    rollno:req.body.rollno
  });

  // Save the form data to the MongoDB Atlas database
  formData.save((error) => {
    if (error) {
      res.status(400).send('Unable to save form data to the database');
    } else {
      res.status(200).send('Form data saved to the database');
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
