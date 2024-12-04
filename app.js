//Kushik Reddy Nannuru, C0917597
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 4000; 

// Connect to MongoDB
mongoose.connect('mongodb://localhost/user_management', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setting up Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Import User model
const User = require('./models/users');

// Routes

// Home page - Display all users
app.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.render('list', { users });
  } catch (err) {
    res.status(500).render('error', { message: 'Error fetching users' });
  }
});

// Route to display the add user form
app.get('/add', (req, res) => {
  res.render('add');
});

// Route to handle adding a new user
app.post('/add', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.redirect('/');
  } catch (err) {
    res.status(400).render('error', { message: 'Error adding user' });
  }
});

// Route to display the update page
app.get('/update', async (req, res) => {
  try {
    const users = await User.find();
    res.render('update', { users });
  } catch (err) {
    res.status(500).render('error', { message: 'Error fetching users' });
  }
});

// Route to fetch a single user's data
app.get('/user/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching user' });
    }
  });

// Route to handle updating a user's information
app.post('/update', async (req, res) => {
  try {
    const { userId, ...updateData } = req.body;
    await User.findByIdAndUpdate(userId, updateData);
    res.redirect('/update');
  } catch (err) {
    res.status(400).render('error', { message: 'Error updating user' });
  }
});

// Route to handle deleting a user
app.delete('/delete/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

app.post('/login', (req, res) => {
  // Implement actual authentication logic here
  res.json({ success: true, message: 'Login successful' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
// To start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});