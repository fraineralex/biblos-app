const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.get('/register-user', AuthController.getSignUp);
router.post('/signup', AuthController.postSignUp);

router.get("/login", AuthController.GetLogin);
router.post("/login", AuthController.PostLogin);
router.post("/logout", AuthController.Logout);

module.exports = router;