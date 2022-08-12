const express = require('express');
const {
  getLove,
  addLove,
  deleteLove
} = require('../controllers/love');

const router = express.Router({ mergeParams: true });
const Love=require('../models/love')
const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');


router
  .route('/').get(
    advancedResults(Love, {
      path:'course',
      select:'title , photo'
    },
   
    ),
    getLove
  ).post(protect,addLove);

router
  .route('/:id')
  .delete(deleteLove);

module.exports = router;