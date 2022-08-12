const mongoose = require("mongoose");

const ViewSchema = new mongoose.Schema({
  view: {
    type: Number,
  },
  
  course: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
    required: true,
  },
});

// // Static method to get avg view and save
ViewSchema.statics.getAverageView = async function (courseId) {
  const obj = await this.aggregate([{$match: { course: courseId },},{
      $group: {
        _id: "$course",
        averageView: { $sum: "$view" },
      },
    },
  ]);

  try {
    await this.model("Course").findByIdAndUpdate(courseId, {
      averageView: obj[0].averageView,
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageView after save
ViewSchema.post("save", async function () {
  await this.constructor.getAverageView(this.course);
});

// Call getAverageView before remove
ViewSchema.post("remove", async function () {
  await this.constructor.getAverageView(this.course);
});

module.exports = mongoose.model("View", ViewSchema);
