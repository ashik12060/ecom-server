const express = require('express');
const router = express.Router();
const { signup, signin, logout, userProfile, getAllUsers } = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth');

//auth routes
// /api/signup
router.post('/signup', signup);
// /api/signin
router.post('/signin', signin);
// /api/logout
router.get('/logout', logout);
// /api/me
router.get('/me', isAuthenticated, userProfile);
// /api/users
router.get('/users', getAllUsers);

module.exports = router;