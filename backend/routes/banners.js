const express = require("express");
const { add, edit, remove, get, getAll } = require("../controllers/banner.js");

const router = express.Router();

router.get("/list", getAll);
router.get("/:id", get);
router.post("/add", add);
router.put("/:id", edit);
router.delete("/:id", remove);

module.exports = router
