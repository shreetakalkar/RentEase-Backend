const express = require('express');
const router = express.Router();
const { getUser } = require('../controllers/userController');
const  protect  = require('../middlewares/authUserMid'); 

router.get('/', protect, getUser);  

module.exports = router;
