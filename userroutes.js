const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const methodOverride = require('method-override'); // Middleware for PUT/DELETE

router.use(methodOverride('_method')); // Enable method override

// Display users
router.get('/adminu', userController.getUsers);

// Create user
router.post('/createUser', userController.createUser);

// Delete user
router.delete('/deleteUser/:id', userController.deleteUser);

// Edit user
router.get('/adminuedit/:id', userController.moveUsertoedit);

// Update user
router.put('/updateUser/:id', userController.updateUser);

module.exports = router;
