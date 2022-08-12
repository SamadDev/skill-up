const express = require('express');
const {
  addFollow,
  getFollow,
  updateFollow,
  deleteFollow
} = require('../controllers/follow');

const Follow = require('../models/Follow');


const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');

const { protect} = require('../middleware/auth');

router
  .route('/')
  .get(
    advancedResults(Follow),
    getFollow
  ).delete(deleteFollow);
  router.route('/:userId').post(protect,addFollow);
  router
  .route('/:id')
  .put(protect, updateFollow)


module.exports = router;