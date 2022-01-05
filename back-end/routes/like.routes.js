//Les importations
const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/likes.controller');
const auth = require('../middleware/auth.middleware');

// Router Like et  Unlike
router.patch('/:id/likedeslike', auth, likeCtrl.likeDeslikePost);
router.post('/:id/postLikedByUser', auth, likeCtrl.postLikedByUser);
router.post('/:id/likeunlike', auth, likeCtrl.countLikes);

module.exports = router;
