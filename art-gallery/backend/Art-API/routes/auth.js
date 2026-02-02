const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const jwt = require('jsonwebtoken');

// Rota de registro
router.post('/register', authController.register);

// Rota de login
router.post('/login', authController.login);

// Rota para gerar um token fixo
router.get('/generate-fixed-token', (req, res) => {
    const token = jwt.sign({ userId: 'guest' }, process.env.JWT_SECRET, { expiresIn: '30d' }); // Token válido por 30 dias
    res.json({ token });
  });

module.exports = router;