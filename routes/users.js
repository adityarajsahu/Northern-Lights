const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');

router.get('/register', users.renderRegister);
router.post('/register', users.registerUser);
router.get('/login', users.renderLogin);
router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login', keepSessionInfo: true}), users.loginUser);
router.get('/logout', users.logoutUser);

module.exports = router;