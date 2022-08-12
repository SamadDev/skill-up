const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Enroll = require("../models/Enroll");
const Course = require("../models/Course");

// @desc      Get reviews
// @route     GET /api/v1/reviews
// @route     GET /api/v1/courses/:courseId/reviews
// @access    Public
exports.getEnrolls = asyncHandler(async (req, res, next) => {
 
    res.status(200).json(res.advancedResults);
  
});

// @desc      Add review
// @route     POST /api/v1/courses/:courseId/reviews
// @access    Private
exports.addEnroll = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.courseId);

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.courseId}`, 404)
    );
  }
  req.body.course = course._id;
  req.body.user = req.user.id;

  const enroll = await Enroll.create(req.body);

  res.status(201).json({
    success: true,
    data: enroll,
  });
});

// @desc      Update enroll
// @route     PUT /api/v1/reviews/:id
// @access    Private
exports.updateEnroll = asyncHandler(async (req, res, next) => {
  let enroll = await Enroll.findById(req.params.id);

  if (!enroll) {
    return next(
      new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
    );
  }

  enroll = await Enroll.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: enroll,
  });
});

// @desc      Delete enroll
// @route     DELETE /api/v1/reviews/:id
// @access    Private
exports.deleteEnroll = asyncHandler(async (req, res, next) => 
{
  const enroll = await Enroll.findById(req.params.id);
  if (!enroll) {
    return next(
      new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
    );
  }

  await enroll.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
