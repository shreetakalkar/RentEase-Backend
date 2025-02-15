const express = require('express');
const { createReview, getReviews } = require('../controllers/reviewController');
const protect = require('../middlewares/authUserMid');
const router = express.Router();

router.post('/',protect, createReview);
router.get('/', getReviews);

module.exports = router;