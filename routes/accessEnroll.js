const express = require("express");
const {
  getAccess,
  getAcces,
  addAccess,

  deleteAccess
} = require("../controllers/accessEnroll");

const Access = require("../models/AccessEnroll");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect } = require("../middleware/auth");


// router.route("/me").get(getAccess);
router
  .route("/")
  .get(advancedResults(Access,({
    path: 'user'
  })), getAccess)
  .post( protect,  addAccess);

router.route("/:id").get(getAcces)
.delete(protect, deleteAccess);

module.exports = router;
