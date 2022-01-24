const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const multer = require('../middleware/multer-config');

// Les routes CRUD
router.get('/:id', auth, userCtrl.getOneUser);
router.put('/:id', auth, multer.single('profil_image'), userCtrl.updateOneUser);
router.get('/image/:id', auth, userCtrl.getProfilPicture);

module.exports = router;
