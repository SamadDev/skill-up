const mongoose = require("mongoose");

const LoveSchema = new mongoose.Schema({
  love: {
    type: Boolean,
    default:false
  },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Love", LoveSchema);
