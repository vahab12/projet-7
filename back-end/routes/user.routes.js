const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const upload = require('../middleware/multer-config');

// Post CRUD
router.get('/:id', userCtrl.getOneUser);
router.get('/image/:id', auth, userCtrl.getProfilPicture);
router.put('/:id', auth, upload.single('profil_image'), userCtrl.updateOneUser);

module.exports = router;
