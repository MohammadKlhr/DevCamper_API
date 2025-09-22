const express = require('express');

const xssSanitize = require('xss-sanitize');

const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviews');

const Review = require('../models/Review');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    advancedResults(Review, { path: 'bootcamp', select: 'name description' }),
    getReviews
  )
  .post(protect, authorize('user', 'admin'), addReview);

router
  .route('/:id')
  .get(xssSanitize.paramSanitize(), getReview)
  .put(
    xssSanitize.paramSanitize(),
    protect,
    authorize('user', 'admin'),
    updateReview
  )
  .delete(
    xssSanitize.paramSanitize(),
    protect,
    authorize('user', 'admin'),
    deleteReview
  );

module.exports = router;
