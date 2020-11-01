const express = require("express");
const passport = require("passport");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/signup", userController.signup);

router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.redirect("/users/account");
  console.log(req.user);
});

router.get("/account", (req, res, next) => {
  res.render("account");
});
router.get("/failedLogin", (req, res, next) => {
  res.send("Failed login!");
});

module.exports = router;
