// const ErrorResponse = require("../utils/errorResponse");
// const asyncHandler = require("../middleware/async");
// const Bootcamp = require("../models/Bootcamp");
// const View = require("../routes/view");
// const { Query } = require("mongoose");


// //___________________________________________________________________
// // @desc      Get all bootcamps
// // @route     GET /api/v1/bootcamps
// // @access    Public
// exports.getBootcamps = asyncHandler(async (req, res, next) => {
//   let query;

//   // Copy req.query
//   const reqQuery = { ...req.query };

//   // remove that words you write in there
//   const removeFields = ["sort"];

//   // Loop over removeFields and delete them from reqQuery(url)
//   removeFields.forEach((param) => delete reqQuery[param]);

//   // Create query string
//   let queryStr = JSON.stringify(reqQuery);
//   queryStr = queryStr.replace(
//     /\b(gt|gte|lt|lte|in)\b/g,
//     (match) => `$${match}`
//   );

//   // to select more than one items
//   let queryObj = JSON.parse(queryStr);

//   const types = ["name", "housing","county"];
//  console.log(queryObj)
 
//  for (const type of types) {
//    if (queryObj[type]) {
//      queryObj[type] = queryObj[type].trim().split(",");
//    }else{
//      delete queryObj[type];
//    }
//  }


//   //find bootcamps linked with
//   query = Bootcamp.find(queryObj).populate("courses");

//   // Sort
//   if (req.query.sort) {
//     const sortBy = req.query.sort.split(",").join(" ");
//     query = query.sort(sortBy);
//   } else {
//     query = query.sort("-createdAt");
//   }
//   // Pagination
//   const page = parseInt(req.query.page, 10) || 1;
//   const limit = parseInt(req.query.limit, 10) || 25;
//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;
//   const total = await Bootcamp.countDocuments();

//   query = query.skip(startIndex).limit(limit);

//   // Executing query
//   const bootcamps = await query;

//   // Pagination result
//   const pagination = {};

//   if (endIndex < total) {
//     pagination.next = {
//       page: page + 1,
//       limit,
//     };
//   }

//   if (startIndex > 0) {
//     pagination.prev = {
//       page: page - 1,
//       limit,
//     };
//   }

//   res.status(200).json({
//     success: true,
//     count: bootcamps.length,
//     pagination,
//     data: bootcamps,
//   });
// });
// // @desc      Get single bootcamp
// // @route     GET /api/v1/bootcamps/:id
// // @access    Public
// exports.getBootcamp = asyncHandler(async (req, res, next) => {
//   const bootcamp = await Bootcamp.findById(req.params.id).populate("courses");

//   if (!bootcamp) {
//     return next(
//       new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
//     );
//   }

//   res.status(200).json({ success: true, data: bootcamp });
// });

// // @desc      Create new bootcamp
// // @route     POST /api/v1/bootcamps
// // @access    Private
// exports.createBootcamp = asyncHandler(async (req, res, next) => {
//   // Add user to req,body
//   req.body.user = req.user.id;

//   // Check for published bootcamp
//   const publishedBootcamp = await Bootcamp.findOne({
//     user: req.user.id,
//   }).populate("courses");

//   // If the user is not an admin, they can only add one bootcamp
//   if (publishedBootcamp && req.user.role !== "admin") {
//     return next(
//       new ErrorResponse(
//         `The user with ID ${req.user.id} has already published a bootcamp`,
//         400
//       )
//     );
//   }

//   const bootcamp = await Bootcamp.create(req.body);

//   res.status(201).json({
//     success: true,
//     data: bootcamp,
//   });
// });

// // @desc      Update bootcamp
// // @route     PUT /api/v1/bootcamps/:id
// // @access    Private
// exports.updateBootcamp = asyncHandler(async (req, res, next) => {
//   let bootcamp = await Bootcamp.findById(req.params.id);

//   if (!bootcamp) {
//     return next(
//       new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
//     );
//   }

//   // Make sure user is bootcamp owner
//   if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
//     return next(
//       new ErrorResponse(
//         `User ${req.user.id} is not authorized to update this bootcamp`,
//         401
//       )
//     );
//   }

//   bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   res.status(200).json({ success: true, data: bootcamp });
// });

// // @desc      Delete bootcamp
// // @route     DELETE /api/v1/bootcamps/:id
// // @access    Private
// exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
//   const bootcamp = await Bootcamp.findById(req.params.id);

//   if (!bootcamp) {
//     return next(
//       new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
//     );
//   }

//   // Make sure user is bootcamp owner
//   if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
//     return next(
//       new ErrorResponse(
//         `User ${req.params.id} is not authorized to delete this bootcamp`,
//         401
//       )
//     );
//   }

//   bootcamp.remove();

//   res.status(200).json({ success: true, data: {} });
// });
