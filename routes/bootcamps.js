// const express = require("express");
// const {
//   getBootcamps,
//   getBootcamp,
//   createBootcamp,
//   updateBootcamp,
//   deleteBootcamp,
// } = require("../controllers/bootcamps");

// const reviewRouter = require('./reviews');

// const router = express.Router();

// const { protect, authorize } = require("../middleware/auth");

// router.use('/:bootcampId/reviews', reviewRouter);


// router
//   .route("/")
//   .get(getBootcamps)
//   .post(protect, authorize('admin','publisher'), createBootcamp);

// router
//   .route("/:id")
//   .get(getBootcamp)
//   .patch(protect, authorize('admin','publisher'), updateBootcamp)
//   .delete(protect, authorize('admin','publisher'), deleteBootcamp);

// module.exports = router;
