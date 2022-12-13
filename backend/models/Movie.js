const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    img: {
      type: String,
    },
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    video: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
