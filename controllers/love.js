const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Love = require('../models/love');
const Course =require('../models/Course')



exports.getLove = asyncHandler(async (req, res, next) => {
 
    res.status(200).json(res.advancedResults);
});


exports.addLove = asyncHandler(async (req, res, next) => {

  const course = await Course.findById(req.params.courseId);

  if (!course) {
    return next(
      new ErrorResponse(
        `No course with the id of ${req.params.courseId}`,
        404
      )
    );
  }
  req.body.course = course._id;
  req.body.user = req.user.id;

  const love = await Love.create(req.body);

  res.status(201).json({
    success: true,
    data: love
  });
});


exports.deleteLove = asyncHandler(async (req, res, next) => {
  const love = await Love.findById(req.params.id);

  if (!love) {
    return next(
      new ErrorResponse(`No love with the id of ${req.params.id}`, 404)
    );
  }

  await love.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});