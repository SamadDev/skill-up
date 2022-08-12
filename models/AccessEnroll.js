const mongoose = require("mongoose");

const AccessEnrollSchema = new mongoose.Schema({
  message :{
    type: String,
    trim: true,
    required: [true, "Pleas add the message"],
  },
  messageKr :{
    type: String,
    trim: true,
    required: [true, "Pleas add the message"],
  },
  messageAr :{
    type: String,
    trim: true,
    required: [true, "Pleas add the right message"],
  },
  opend:{
    type:Boolean,
    default:false
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
 enroll: {
    type: mongoose.Schema.ObjectId,
    ref: "Enroll",
    required: true,
  },
 
});

module.exports = mongoose.model("AccessEnroll", AccessEnrollSchema);
