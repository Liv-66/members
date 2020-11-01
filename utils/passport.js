const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      { usernameField: "name" },
      catchAsync(async (name, password, done) => {
        const user = await User.findOne({ name }).select("password");
        if (!user) {
          return done(null, false, { message: "查無資料" });
        }
        if (user.password !== password) {
          return done(null, false, { message: "密碼錯誤" });
        }
        return done(null, user);
      })
    )
  );

  passport.serializeUser(async(user, done) => {
    done(null, user.id);

  });
  passport.deserializeUser(async(id, done) => {
    await User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
