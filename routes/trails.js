const express = require('express');

const router = express.Router();

const trailsController = require('../controllers/trails/trails');
const tagController = require('../controllers/trails/tag');
const trailIdController = require('../controllers/trails/trailId');

router.get('/', trailsController.get);
router.post('/', trailsController.post);
router.get('/:tag', tagController);
router.get('/:tag/:trailId', trailIdController);

module.exports = router;
