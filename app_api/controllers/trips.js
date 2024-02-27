const mongoose = require("mongoose");
const model = mongoose.model("trips");
const user = require("../models/user");
const jwt = require("jsonwebtoken");

// GET: /trips - lists all trips
const tripsList = async (req, res) => {
  model.find({}).exec((err, trips) => {
    if (!trips) {
      return res.status(404).json({ message: "trip not found" });
    } else if (err) {
      return res.status(404).json(err);
    } else {
      return res.status(200).json(trips);
    }
  });
};

// GET: /trips/:tripCode - returns a single trip
const tripsFindCode = async (req, res) => {
  model.find({ code: req.params.tripCode }).exec((err, trip) => {
    if (!trip) {
      return res.status(404).json({ message: "trip not found" });
    } else if (err) {
      return res.status(404).json(err);
    } else {
      return res.status(200).json(trip);
    }
  });
};

// POST: /trips - adds a trip to the DB
const tripsAddTrip = async (req, res) => {
  getUser(req, res, (req, res) => {
    model.create(
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
      },
      (err, trip) => {
        if (err) {
          return res.status(400).json(err);
        } else {
          return res.status(201).json(trip);
        }
      }
    );
  });
};

// PUT: /trips/tripCode - Updates a trip in the DB
const tripsUpdateTrip = async (req, res) => {
  console.log(req.body);
  getUser(req, res, (req, res) => {
    model
      .findOneAndUpdate(
        { code: req.params.tripCode },
        {
          code: req.body.code,
          name: req.body.name,
          length: req.body.length,
          start: req.body.start,
          resort: req.body.resort,
          perPerson: req.body.perPerson,
          image: req.body.image,
          description: req.body.description,
        },
        { new: true }
      )
      .then((trip) => {
        if (!trip) {
          return res.status(404).send({
            message: `Trip not found with code ${req.params.tripCode}`,
          });
        }
        res.send(trip);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: `Trip not found with code ${req.params.tripCode}`,
          });
        }
        return res.status(500).json(err);
      });
  });
};

// DELETE: /trips/tripCode - Removes a trip from the DB
async function tripsDeleteTrip(req, res) {
  console.log(req.body);
  getUser(req, res, (req, res) => {
    model
      .deleteOne({ code: req.params.tripCode })
      .then((result) => {
        if (!result.deletedCount)
          return res.status(404).send({
            message: `Could not find document ${req.params.tripCode}`,
          });

        return res
          .status(200)
          .send({ message: `Deleted ${result.deletedCount} document` });
      })
      .catch((err) => {
        return res
          .status(404)
          .send({ message: `Error deleting document ${err}` });
      });
  });
}

// Gets the user from the db
function getUser(req, res, callback) {
  if (req.payload && req.payload.email) {
    user.findOne({ email: req.payload.email }).exec((err, user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else if (err) {
        console.log(err);
        return res.status(404).json(err);
      }
      callback(req, res, user.name);
    });
  } else {
    return res.status(404).json({ message: "payload not found" });
  }
}

module.exports = {
  tripsList,
  tripsFindCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip,
};
