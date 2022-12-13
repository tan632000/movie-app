const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema(
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
    uid: {
      type: String,
      unique: true,
    },
    video: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorite", FavoriteSchema);
