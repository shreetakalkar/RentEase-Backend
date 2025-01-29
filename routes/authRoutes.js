const express = require('express');
const { signup, login } = require('../controllers/authUser');
const { ownerSignup, ownerLogin } = require('../controllers/authOwner');

const router = express.Router();

router.post('/usersignup', signup);
router.post('/userlogin', login);
router.post('/ownersignup', ownerSignup);
router.post('/ownerlogin', ownerLogin);

module.exports = router;
