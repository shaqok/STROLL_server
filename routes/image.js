const express = require('express');

const multer = require('multer');
const path = require('path');

const router = express.Router();
const imageController = require('../controllers/image');

// multer: setting
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

router.post('/', upload.single('img'), imageController);

module.exports = router;
