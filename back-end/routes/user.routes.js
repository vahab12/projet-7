const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const upload = require('../middleware/multer-config');

// users
router.post('/signup', auth, userCtrl.signup);
router.post('/login', auth, userCtrl.login);
router.get('/logout', auth, userCtrl.logout);
router.delete('/delete', auth, userCtrl.deleteProfile);

// Post CRUD
router.get('/:id', auth, userCtrl.getOneUser);
router.get('/image/:id', auth, userCtrl.getProfilPicture);
router.put('/:id', auth, upload.single('profil_image'), userCtrl.updateOneUser);

module.exports = router;
