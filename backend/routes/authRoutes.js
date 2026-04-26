const express = require('express');
const router = express.Router();
const { loginUser, registerUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', registerUser); // Added for testing
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;
