const express = require("express");
const passport = require("passport");
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/signup', userController.signup)

router.get("/login", (req, res) => {
  res.render("login");
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "successLogin",
    failureRedirect: "failedLogin",
  })
);

router.get("/successLogin", (req, res, next) => {
  res.send("Success login!");
});
router.get("/failedLogin", (req, res, next) => {
  res.send("Failed login!");
});

module.exports = router;
