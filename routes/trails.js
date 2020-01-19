const express = require('express');

const multer = require('multer');
const path = require('path');

const router = express.Router();
const upload = multer({
  storage: multer.diskStorage({
    // set a localstorage destination
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    // convert a file name
    filename: (req, file, cb) => {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});

const trailsController = require('../controllers/trails/trails');
const tagController = require('../controllers/trails/tag');
const trailIdController = require('../controllers/trails/trailId');
const commentController = require('../controllers/trails/comment');
const imageController = require('../controllers/trails/image');

router.get('/', trailsController.get);
router.post('/', trailsController.post);
router.get('/:tag', tagController);
router.get('/:tag/:trailId', trailIdController);
router.post('/:tag/:trailId/comment', commentController);
router.post('/:tag/:trailId/image', upload.single('img'), imageController);

module.exports = router;
