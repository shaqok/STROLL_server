const express = require('express');

const router = express.Router();
const signUpController = require('../controllers/signup');

router.post('/', signUpController);

module.exports = router;
