const mongoose = require("mongoose");

const FollowSchema = new mongoose.Schema({
  follow: {
    type: Boolean,
  },
  
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Follow", FollowSchema);
