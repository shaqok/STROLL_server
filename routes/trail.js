const express = require('express');

const router = express.Router();

const trailController = require('../controllers/trails/trail');
const detailController = require('../controllers/trails/detail');
const addtrailController = require('../controllers/trails/addtrail');

router.get('/', trailController);
router.get('/detail', detailController);
router.post('/addtrail', addtrailController);

module.exports = router;
