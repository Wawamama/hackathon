var express = require('express');
var router = express.Router();

var userModel = require('../models/users');
var journeyModel = require('../models/journeys')

const mongoose = require('mongoose');

var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/homepage', async (req, res, next) => {
  res.render('home', { title: 'Express' });
})

router.get('/no-train', async (req, res, next) => {
  res.render('error', { title: 'Sorry, no train' });
})

router.get('/trains', async (req, res, next) => {
  res.render('trains', { title: 'Available Trains' });
})

module.exports = router;
