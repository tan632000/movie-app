const express = require("express");
const { update, deleteUser, getUser } = require("../controllers/user.js");
const { verifyToken } = require("../verifyToken.js");

const router = express.Router();

//update user
router.put("/:id", verifyToken, update);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user
router.get("/find/:id", getUser);

module.exports = router
