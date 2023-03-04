const express = require('express');
const { check } = require('express-validator');

const postControllers = require('../controllers/post-controllers');
const fileUpload = require('../middleware/file-Upload');

const router = express.Router();

router.get('/:pid', postControllers.getPostById);

router.get('/user/:uid', postControllers.getPostByUserId);

router.post(
  '/',
  fileUpload.single('image'),
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  postControllers.createPost
);

router.patch(
  '/:pid',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  postControllers.updatePost
);

router.delete('/:pid', postControllers.deletePost);

module.exports = router;