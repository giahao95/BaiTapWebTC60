var express = require('express');
var router = express.Router();
const {
  registerUser,
  authLogin,
  getUserProfile,
  updateUserProfile,
  getAllUser,
  deleteUser,
  getUserById,
  updateUserById,
} = require('../controller/userController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// @desc: Register a new user
// @route: POST /api/users
// @access: Public - return token
router.post('/', registerUser);

// @desc: User can login to system
// @route: POST /api/users/login
// @access: Public - return token
router.post('/login', authLogin);

// @desc: Get user profile
// @route: GET /api/users/profile
// @access: Private - Su dung token
router.get('/profile', protect, getUserProfile);

// @desc: update user profile
// @route: PUT /api/users/profile
// @access: Private
router.put('/profile', protect, updateUserProfile);

// @desc: Get all users
// @route: GET /api/users
// @access: Private/admin
router.get('/', protect, isAdmin, getAllUser);

// @desc: Delete user
// @route: DELETE /api/users/:id
// @access: Private/admin
router.delete('/:id', protect, isAdmin, deleteUser);

// @desc: Get user by ID
// @route: GET /api/users/:id
// @access: Private/admin
router.get('/:id', protect, isAdmin, getUserById);

// @desc: Update user by ID
// @route: PUT /api/users/:id
// @access: Private/admin
router.put('/:id', protect, isAdmin, updateUserById);

module.exports = router;
