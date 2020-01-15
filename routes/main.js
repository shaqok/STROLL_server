const express = require('express');

const router = express.Router();

const signUpController = require('../controllers/main/signup');
const signInController = require('../controllers/main/singin');

router.post('/signup', signUpController);
router.post('/signin', signInController);

module.exports = router;
