const express = require("express");
const viewController = require("../controllers/viewController");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", viewController.login);
router.get("/account", userController.isLogedIn, viewController.getMe);

// router.get('/signup', viewController.signup);

module.exports = router;
