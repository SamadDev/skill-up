const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a course title"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  weeks: {
    type: String,
    required: [true, "Please add number of weeks"],
  },
  tuition:{
    type: Number,
    required: [true, "Please add a tuition cost"],
  },
  minimumSkill: {
    type: String,
    required: [true, "Please add a minimum skill"],
  },
  cVideos:[],
  videoPath:[],
  certificate: {
    type: Boolean,
    required:[true,"pleas provide certificate"]
  },
  housing: {
    type: Boolean,
  },
  address: { type: String },
  state: {
    type: String,
    require: [true, "pleas selcte state of your course"],
  },
  typeSkill: {
    type: String,
    require: [true, "pleas add type of skill"],
  },
  photo: {
    type: String,
    require: [true, "Please add a photo"],
  },
  link: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating must can not be more than 5"],
  },
  averageView: {
    type: Number,
  },
  language: {
    type: String,
    required: [true, "pleas provide the language to your course"],
  },
  dateCrate:{
  type:String,
  },
  dateUpdate:{
    type:String,
    },

  //multilanguage
  titleKr:{
    type:String
  },
  descriptionKr:{
    type:String
  },

  titleAr:{
    type:String,
  },
  descriptionAr:{
    type:String
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Course", CourseSchema);
