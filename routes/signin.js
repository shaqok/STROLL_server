const express = require('express');

const router = express.Router();
const signInController = require('../controllers/singin');

router.post('/', signInController);

module.exports = router;
