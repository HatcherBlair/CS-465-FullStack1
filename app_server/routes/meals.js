var express = require("express");
var router = express.Router();
const controller = require("../controllers/meals");

/* GET home page. */
router.get("/", controller.mealsList);

module.exports = router;
