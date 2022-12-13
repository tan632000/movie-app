const express = require("express");
const { signin, signup } = require("../controllers/auth.js");

const router = express.Router();

// Create a user
router.post("/signup", signup);
// Sign In
router.post("/signin", signin);

// Google Auth
router.post("/google");

module.exports = router
