const express = require('express');

const xssSanitize = require('xss-sanitize');

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

const User = require('../models/User');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

// router.use(protect);
// router.use(authorize('admin'));

router.route('/').get(advancedResults(User), getUsers).post(createUser);

router
  .route('/:id')
  .get(xssSanitize.paramSanitize(), protect, authorize('admin'), getUser)
  .put(xssSanitize.paramSanitize(), protect, authorize('admin'), updateUser)
  .delete(xssSanitize.paramSanitize(), protect, authorize('admin'), deleteUser);

module.exports = router;
