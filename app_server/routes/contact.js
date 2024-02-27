var express = require('express');
var router = express.Router();
const controller = require('../controllers/contact');

/* GET Travel Page */
router.get('/', controller.contact);

module.exports = router;