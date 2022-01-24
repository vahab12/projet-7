//Les importations
const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controller');
const auth = require('../middleware/auth.middleware');
const multer = require('../middleware/multer-config');

// Router post
router.post('/', multer.single('post_image'), postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deleteOnePost);

//router Images
router.get('/image/:id', auth, postCtrl.getOneImage);



module.exports = router;
