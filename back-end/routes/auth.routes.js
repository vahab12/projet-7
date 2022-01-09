const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/auth.controller');

// es routes pour l'authentification
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/logout', userCtrl.logout);
//router.get('/desactivateAccount/:id', userCtrl.desactivateAccount);
router.delete('/delete/:id', userCtrl.delete);

module.exports = router;
