const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Follow = require('../models/Follow');
const User =require('../models/Users')


// @desc      Get views
// @route     GET /api/v1/views
// @route     GET /api/v1/courses/:courseId/views
// @access    Public
exports.getFollow = asyncHandler(async (req, res, next) => {
  if (req.params.userId) {
    const follow = await Follow.find({ user: req.params.userId });
      
    return res.status(200).json({
      success: true,
      count: follow.length,
      data: follow
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});



// @desc      Add view
// @route     POST /api/v1/courses/:courseId/views
// @access    Private
exports.addFollow = asyncHandler(async (req, res, next) => {
try{
  const user = await User.findById(req.params.userId);
   console.log(user);
  if (!user) {
    return next(
      new ErrorResponse(
        `No user with the id of ${req.params.userId}`,
        404
      )
    );
  }
  req.body.user = user._id;

  const follow = await Follow.create(req.body);

  res.status(201).json({
    success: true,
    data:follow
  });}catch(err){
      console.log(err)
  }
});

// // @desc      Update view
// // @route     PUT /api/v1/views/:id
// // @access    Private
exports.updateFollow = asyncHandler(async (req, res, next) => {
  let follow = await Follow.findById(req.params.id);

  if (!follow) {
    return next(
      new ErrorResponse(`No follow with the id of ${req.params.id}`, 404)
    );
  }

  follow = await Follow.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: follow
  });
});


// @desc      Delete review
// @route     DELETE /api/v1/reviews/:id
// @access    Private
exports.deleteFollow = asyncHandler(async (req, res, next) => {
  // const follow = await Follow.findById(req.params.id);
  await Follow.findOneAndDelete()
// await Follow.findOne.delete()
  // await follow.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
