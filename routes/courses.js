  const express = require("express");
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");

const viewRouter = require('./view');
const reviewRouter = require('./reviews');
const love=require('./love')
const enrollRouter = require('./enroll');
const Course = require('../models/Course');
const advancedResults = require('../middleware/advancedResults');
const router = express.Router({ mergeParams: true });
const { protect, authorize } = require("../middleware/auth");


router.use('/:courseId/enroll', enrollRouter);
router.use('/:courseId/reviews', reviewRouter);
router.use('/:courseId/view', viewRouter);
router.use('/:courseId/love', love);

router
  .route('/')
  .get(
    advancedResults(Course,{
      path:"user",select:"name"
    }),
    getCourses
  )


router
  .route("/:userId/courses")
  .get(getCourses)
  .post(protect, authorize('admin','publisher'), addCourse);

router
  .route("/:id")
  .get(getCourse)
  .put(protect, authorize('admin','publisher'), updateCourse)
  .delete(protect, authorize('admin','publisher'), deleteCourse);

module.exports = router;
