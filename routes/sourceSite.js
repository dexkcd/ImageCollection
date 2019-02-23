var express = require('express');
var router = express.Router();
var source_site_controller = require('../controllers/sourceSiteController')

/* GET users listing. */
router.get('/', source_site_controller.getData);

module.exports = router;
