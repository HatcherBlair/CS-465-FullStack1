const mongoose = require("mongoose");

// Define the trip schema
const tripSchema = new mongoose.Schema({
  code: { type: String, required: true, index: true },
  name: { type: String, required: true, index: true },
  length: { type: String, required: true },
  start: { type: Date, required: true },
  resort: { type: String, required: true },
  perPerson: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
});
mongoose.model("trips", tripSchema);

// Define Room Schema
const roomSchema = new mongoose.Schema({
  code: { type: String, required: true, index: true },
  name: { type: String, required: true, index: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  rate: { type: String, required: true, index: true },
});
mongoose.model("rooms", roomSchema);

// Define Meal Options Schema
const mealSchema = new mongoose.Schema({
  code: { type: String, required: true, index: true },
  name: { type: String, required: true, index: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
});
mongoose.model("meals", mealSchema);
