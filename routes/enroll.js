const express = require("express");
const {
  getEnrolls,
  addEnroll,
  updateEnroll,
  deleteEnroll,

} = require("../controllers/userEnroll");

const enrollRouter = require('./enroll');
const accessRouter=require('./accessEnroll')
const enroll = require("../models/Enroll");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect} = require("../middleware/auth");


router.use('/:enrollId/access', accessRouter);

router
  .route("/")
  .get(advancedResults(enroll,{
    path:"course",select:"user , title , photo , titleKr , titleAr"
  }), getEnrolls)
  .post(protect, addEnroll);

router
  .route("/:id")
  .put(protect, updateEnroll)
  .delete(protect, deleteEnroll);

module.exports = router;
