const passport = require("passport");
const LocalStrategy = require("passport-local");
const model = require("../models/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    (username, password, done) => {
      model.findOne({ email: username }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false, { message: "Incorrect Username" });
        if (!user.validPassword(password))
          return done(null, false, { message: "Incorrect Password" });

        return done(null, user);
      });
    }
  )
);
