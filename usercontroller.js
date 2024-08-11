const User = require('../models/usermodel'); // Adjust the path as needed
const bcrypt = require('bcrypt'); // For hashing passwords
const moment = require('moment'); // For date formatting


exports.moveUsertoedit = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render('adminuedit', { obj: user, domainName: 'dxx24bpv-8080.uks1.devtunnels.ms' });
  } catch (error) {
    console.error('Error fetching user for edit:', error);
    res.status(500).json({ error: 'An error occurred while fetching the user for edit' });
  }
};
// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Check if all required fields are present
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.redirect('/adminu'); // Redirect to user management page
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render('adminu', { users, moment }); // Pass moment to the EJS template
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render('adminuedit', { user }); // Render the edit form
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'An error occurred while fetching the user' });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, password } = req.body;

    // Check if all required fields are present
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Hash the new password before updating
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(id, {
      firstname,
      lastname,
      email,
      password: hashedPassword
    }, { new: true });

    res.redirect('/adminu'); // Redirect to user management page
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.redirect('/adminu'); // Redirect to user management page
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
};
