const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema(
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

module.exports = mongoose.model("Banner", BannerSchema);
