const mongoose = require("mongoose");

const EnrollSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please add a name for the review"],
    maxlength: 40,
  },
  phone: {
    type: Number,
    required: [true, "Please add some phone number"],
  },
  address: {
    type: String,
    minlength: 5
  },

  isVeryfiy:{
    type:String,
    default:'pending'
  },
  enrolltype:{
   type:String,
   default:'false' 
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
    required: true,
  },
});

// Prevent user from submitting more than one review per course
EnrollSchema.index({ course: 1, user: 1});

module.exports = mongoose.model("Enroll", EnrollSchema);
