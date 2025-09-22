const express = require('express');

const xssSanitize = require('xss-sanitize');

const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courses');

const Course = require('../models/Course');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    advancedResults(Course, { path: 'bootcamp', select: 'name description' }),
    getCourses
  )
  .post(protect, authorize('publisher', 'admin'), addCourse);

router
  .route('/:id')
  .get(xssSanitize.paramSanitize(), getCourse)
  .put(
    xssSanitize.paramSanitize(),
    protect,
    authorize('publisher', 'admin'),
    updateCourse
  )
  .delete(
    xssSanitize.paramSanitize(),
    protect,
    authorize('publisher', 'admin'),
    deleteCourse
  );

module.exports = router;
