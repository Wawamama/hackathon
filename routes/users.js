var express = require('express');
const mongoose = require('mongoose');

var userModel = require('../models/users')
var userController = require('../controllers/userController')

var router = express.Router();

router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.post('/sign-up', userController.signUp)
router.post('/sign-in', userController.signIn)

module.exports = router;
