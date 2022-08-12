const express = require('express');
const {
  getViews,
  getview,
  addView,
  getViewAll,
  updateView,
 
} = require('../controllers/view');

const View = require('../models/View');


const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');


router.route("/all").get(getViewAll);
router
  .route('/')
  .get(
    advancedResults(View,{
      path:'course',
    }
    ),
    getViews
  )
  .post(addView);
router.route('/:id').get(getview)
router
  .route('/:id')
  .put( updateView)

module.exports = router;