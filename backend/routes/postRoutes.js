const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');


router.post('/createPost', postController.createPost);
router.get('/getPostById/:id', postController.getPostById);
router.get('/getPostByNgoId/:id', postController.getPostByNgoId);
router.get('/getAll', postController.getAll);

module.exports = router;