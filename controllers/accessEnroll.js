const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Access = require("../models/AccessEnroll");
const Enroll = require("../models/Enroll");

// exports.getAccess = asyncHandler(async (req, res, next) => {
//   if (req.params.enrollId) {
//     const access = await Access.find({ enroll: req.params.enrollId });

//     return res.status(200).json({
//       success: true,
//       count: access.length,
//       data: access,
//     });
//   } else {
//     res.status(200).json(res.advancedResults);
//   }
// });


exports.getAccess=asyncHandler(async(req,res,nex)=>{
  const access=await Access.find({}).populate("enroll");
  res.status(200).json(access)
  })
  

exports.getAcces = asyncHandler(async (req, res, next) => {
  const access = await Access.findById(req.params.id);

  if (!access) {
    return next(
      new ErrorResponse(`No access found with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: access,
  });
});

exports.addAccess = asyncHandler(async (req, res, next) => {
  const enroll = await Enroll.findById(req.params.enrollId);

  if (!enroll) {
    return next(
      new ErrorResponse(`No enroll with the id of ${req.params.courseId}`, 404)
    );
  }
  req.body.enroll = enroll._id;
  req.body.user = req.user.id;

  const access = await Access.create(req.body);

  res.status(201).json({
    success: true,
    data: access,
  });
});




// @desc      Delete review
// @route     DELETE /api/v1/reviews/:id
// @access    Private
exports.deleteAccess= asyncHandler(async (req, res, next) => {
  const access = await Access.findById(req.params.id);

  if (!access) {
    return next(
      new ErrorResponse(`No accesss with the id of ${req.params.id}`, 404)
    );
  }
  await access.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
