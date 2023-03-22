const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.get('/register-user', AuthController.getSignUp);


module.exports = router;