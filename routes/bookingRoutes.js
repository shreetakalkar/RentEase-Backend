const express = require('express');
const { createBooking, getBookings } = require('../controllers/bookingController');
const authUserMid = require('../middlewares/authUserMid');

const router = express.Router();

router.post('/', authUserMid, createBooking); 
router.get('/', authUserMid, getBookings);

module.exports = router;
