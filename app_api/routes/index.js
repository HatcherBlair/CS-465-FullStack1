const express = require("express");
const router = express.Router();

// Trips
const tripsController = require("../controllers/trips");
router
  .route("/trips")
  .get(tripsController.tripsList)
  .post(tripsController.tripsAddTrip);

router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindCode)
  .put(tripsController.tripsUpdateTrip)
  .delete(tripsController.tripsDeleteTrip);

// Rooms
const roomsController = require("../controllers/rooms");
router.route("/rooms").get(roomsController.roomsList);

// Meals
const mealsController = require("../controllers/meals");
router.route("/meals").get(mealsController.mealsList);

module.exports = router;
