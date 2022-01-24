//Les importations
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/auth.controller');
const auth = require('../middleware/auth.middleware');

// les routes pour l'authentification
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/logout', userCtrl.logout);
router.delete('/delete/:id', userCtrl.delete);

module.exports = router;
