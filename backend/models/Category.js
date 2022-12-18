const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
