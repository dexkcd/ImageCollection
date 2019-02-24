var express = require('express');
var router = express.Router();
var brand_controller = require('../controllers/brandController');

/* GET users listing. */
router.get('/', brand_controller.getData);

module.exports = router;
