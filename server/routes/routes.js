const express = require('express');
const { loginUser } = require('../controllers/loginController');
const { registerUser } = require('../controllers/registerController');

const router = express.Router();

// Defina as rotas de login e registro
router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;
