const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');
const User=require('../models/Users');



//___________________________________________________________________
// @desc      Get all courses
// @route     GET /api/v1/course
// @access    Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // remove that words you write in there
  const removeFields = ["sort"];

  // Loop over removeFields and delete them from reqQuery(url)
  removeFields.forEach((param) => delete reqQuery[param]);


  // Create query string
  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

const types = ["title", "minimumSkill","state","typeSkill","language","certificategit"];
  // to select more than one items
  let queryObj = JSON.parse(queryStr);

 console.log(queryObj)
 
 for (const type of types) {
   if (queryObj[type]) {
     queryObj[type] = queryObj[type].trim().split(",");
   }else{
     delete queryObj[type];
   }
 }


  //find courses linked with
  query = Course.find(queryObj).populate({
    path:"user",select:"photo , name"
  })

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Course.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const courses = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    count: courses.length,
    pagination,
    data: courses,
  });
});


// @desc      Get single course
// @route     GET /api/v1/courses/:id
// @access    Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate('user')

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: course
  });
});




// @desc      Add course
// @route     POST /api/v1/courses
// @access    Private
exports.addCourse = asyncHandler(async (req, res, next) => {
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
  const course = await Course.create(req.body);
  res.status(200).json({
    success: true,
    data: course
  });}catch(err){
    console.log(err)
  }
});

// @desc      Update course
// @route     PUT /api/v1/courses/:id
// @access    Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is course owner
  if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update course ${course._id}`,
        401
      )
    );
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  course.save();

  res.status(200).json({
    success: true,
    data: course
  });
});

// @desc      Delete course
// @route     DELETE /api/v1/courses/:id
// @access    Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is course owner
  if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete course ${course._id}`,
        401
      )
    );
  }

  await course.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});