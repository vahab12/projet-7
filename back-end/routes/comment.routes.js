const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment.controller');
const auth = require('../middleware/auth.middleware');

// les router CRUD pour commentaires
router.post('/:id', auth, commentCtrl.createComment);
router.get('/:id/allcomments', auth, commentCtrl.getAllComments);
router.get('/:id', auth, commentCtrl.getOneComment);
router.delete('/:id', auth, commentCtrl.deleteOneComment);

module.exports = router;
