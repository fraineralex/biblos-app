const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.get('/register-user', AuthController.getSignUp);
router.post('/signup', AuthController.postSignUp);

router.post("/login", AuthController.PostLogin);
router.get("/logout", AuthController.Logout);

module.exports = router;