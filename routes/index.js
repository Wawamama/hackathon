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

router.get('/success', (req, res) => {
  res.render('success');
 });

router.get('/cancel', (req, res) => {
  res.render('index');
 });

 // WEEELLLLL
//  router.get('/save', async function(req, res, next) {

//   // How many journeys we want
//   var count = 300
//   var city = ["Earth","Mercury","Venus","Jupiter","Saturn","Uranus","Neptune","Pluto"]
//   var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]

//   // Save  ---------------------------------------------------
//     for(var i = 0; i< count; i++){

//     departureCity = city[Math.floor(Math.random() * Math.floor(city.length))]
//     arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))]

//     if(departureCity != arrivalCity){

//       var newJourney = new journeyModel ({
//         departure: departureCity , 
//         arrival: arrivalCity, 
//         date: date[Math.floor(Math.random() * Math.floor(date.length))],
//         departureTime:Math.floor(Math.random() * Math.floor(23)) + ":00",
//         price: Math.floor(Math.random() * Math.floor(125)) + 25,
//       });
//        await newJourney.save();
//     }

//   }
  
// });

module.exports = router;
