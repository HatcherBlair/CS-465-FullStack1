const mongoose = require("mongoose");
const model = mongoose.model("meals");

// GET: /meals - lists all meals
const mealsList = async (req, res) => {
  model.find({}).exec((err, meals) => {
    if (!meals) {
      return res.status(404).json({ message: "meals not found" });
    } else if (err) {
      return res.status(404).json(err);
    } else {
      return res.status(200).json(meals);
    }
  });
};

module.exports = { mealsList };
