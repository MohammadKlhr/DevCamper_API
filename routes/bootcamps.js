const express = require('express');

const xssSanitize = require('xss-sanitize');

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require('../controllers/bootcamps');

const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middleware/advancedResults');

// Include other resource routers
const courseRouter = require('./courses');
const reviewRouter = require('./reviews');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:bootcampId/courses', xssSanitize.paramSanitize(), courseRouter);
router.use('/:bootcampId/reviews', xssSanitize.paramSanitize(), reviewRouter);

router
  .route('/radius/:lng/:lat/:distance')
  .get(xssSanitize.paramSanitize(), getBootcampsInRadius);

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp);

router
  .route('/:id')
  .get(xssSanitize.paramSanitize(), getBootcamp)
  .put(
    xssSanitize.paramSanitize(),
    protect,
    authorize('publisher', 'admin'),
    updateBootcamp
  )
  .delete(
    xssSanitize.paramSanitize(),
    protect,
    authorize('publisher', 'admin'),
    deleteBootcamp
  );

router
  .route('/:id/photo')
  .put(
    xssSanitize.paramSanitize(),
    protect,
    authorize('publisher', 'admin'),
    bootcampPhotoUpload
  );

module.exports = router;
