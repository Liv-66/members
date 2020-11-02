const express = require("express");
const passport = require("passport");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/signup", userController.signup);


router.post("/login", userController.login);


router.get("/failedLogin", (req, res, next) => {
  res.send("Failed login!");
});

module.exports = router;
