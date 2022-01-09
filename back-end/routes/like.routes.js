//Les importations
const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like.controllers');
const auth = require('../middleware/auth.middleware');

// Les routes CRUD pour Like et  deslike
router.patch('/:id/likeDeslike', auth, likeCtrl.likeDeslikePost);
router.post('/:id/postLikedByUser', auth, likeCtrl.postLikedByUser);
router.post('/:id/countLike', auth, likeCtrl.countLikes);

module.exports = router;
