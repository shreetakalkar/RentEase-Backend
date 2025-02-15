const express = require('express');
const { createRoom, getRooms } = require('../controllers/roomController');
const protect = require('../middlewares/authUserMid');
const router = express.Router();

router.post('/',protect, createRoom);
router.get('/', getRooms);

module.exports = router;