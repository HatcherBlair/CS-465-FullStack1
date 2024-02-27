const express = require("express");
const router = express.Router();
const { expressjwt: jwt } = require("express-jwt");
const auth = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
});

// Trips
const tripsController = require("../controllers/trips");
router
  .route("/trips")
  .get(tripsController.tripsList)
  .post(auth, tripsController.tripsAddTrip);

router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindCode)
  .put(auth, tripsController.tripsUpdateTrip)
  .delete(auth, tripsController.tripsDeleteTrip);

// Rooms
const roomsController = require("../controllers/rooms");
router.route("/rooms").get(roomsController.roomsList);

// Meals
const mealsController = require("../controllers/meals");
router.route("/meals").get(mealsController.mealsList);

// User Authentication
const authController = require("../controllers/authentication");
router.route("/login").post(authController.login);
router.route("/register").post(authController.register);

module.exports = router;
