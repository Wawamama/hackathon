var express = require('express');
var router = express.Router();

var userModel = require('../models/users');
var journeyModel = require('../models/journeys')

const mongoose = require('mongoose');
// const { findByIdAndUpdate } = require('../models/users');

var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title : 'TicketTac'});
});

router.get('/homepage', async (req, res, next) => { 
    if(req.session.dataCardTrain == undefined){
      req.session.dataCardTrain = []
    }
    res.render('home', { title: 'TicketTac', city, date });
})

router.get('/no-train', async (req, res, next) => {
  res.render('notrain', { title: 'Sorry, no train' });
})

module.exports = router;
