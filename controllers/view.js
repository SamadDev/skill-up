const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const View = require('../models/View');
const Course =require('../models/Course')


// @desc      Get views
// @route     GET /api/v1/views
// @route     GET /api/v1/courses/:courseId/views
// @access    Public
exports.getViews = asyncHandler(async (req, res, next) => {
  if (req.params.courseId) {
    const views = await View.find({ course: req.params.courseId });
      
    return res.status(200).json({
      success: true,
      count: views.length,
      data: views
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

exports.getViewAll=asyncHandler(async(req,res,nex)=>{
  const access=await View.find({});
  res.status(200).json(access)
  })
  


exports.getview=asyncHandler(async(req,res,next)=>{
  try{
  const views = await View.find({ user: req.params.userId });
      
    return res.status(200).json({
      success: true,
      count: views.length,
      data: views
    });}catch(err){
      console.log(err)
    }

})

// @desc      Add view
// @route     POST /api/v1/courses/:courseId/views
// @access    Private
exports.addView = asyncHandler(async (req, res, next) => {

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

  const view = await View.create(req.body);

  res.status(201).json({
    success: true,
    data:view
  });
});

// @desc      Update view
// @route     PUT /api/v1/views/:id
// @access    Private
exports.updateView = asyncHandler(async (req, res, next) => {
  let view = await View.findById(req.params.id);

  if (!view) {
    return next(
      new ErrorResponse(`No view with the id of ${req.params.id}`, 404)
    );
  }

  view = await View.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: view
  });
});

