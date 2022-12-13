const express = require("express");
const storage = require('../lib/multer.js')
const { add, edit, remove, get, getAll, uploadVideo } = require("../controllers/movie.js");

const router = express.Router();

router.get("/list", getAll);
router.get("/:id", get);
router.post("/add", add);
router.post("/upload", storage.fields(
    [
        { 
          name: 'file', 
          maxCount: 1 
        }, 
        { 
          name: 'image', 
          maxCount: 1 
        }
      ]
), uploadVideo)
router.put("/:id", edit);
router.delete("/:id", remove);

module.exports = router
