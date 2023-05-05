const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected!");
})
.catch(err => {
  console.error(err);
});

// Create a schema for users
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

// Create a model for users based on the schema
const User = mongoose.model('User', userSchema);

// Use body-parser to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the public folder
app.use(express.static('public'));

// Handle GET requests to the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Handle POST requests to the register URL
app.post('/register', (req, res) => {
  const user = new User({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email
  });

  user.save()
  .then(() => {
    res.send("User registered successfully!");
  })
  .catch(err => {
    console.error(err);
    res.status(500).send("Error registering user.");
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
