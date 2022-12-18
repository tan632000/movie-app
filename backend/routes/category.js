const express = require("express");
const { add, edit, remove, getAll } = require("../controllers/category.js");

const router = express.Router();

router.get("/list", getAll);
router.post("/add", add);
router.put("/:id", edit);
router.delete("/:id", remove);

module.exports = router
