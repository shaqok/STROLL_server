const express = require('express');

const router = express.Router();
const signInController = require('../controllers/signin');

router.post('/', signInController);

module.exports = router;
