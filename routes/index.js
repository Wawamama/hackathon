var express = require('express');
var router = express.Router();

var userModel = require('../models/users');
var journeyModel = require('../models/journeys')

const mongoose = require('mongoose');
const { findByIdAndUpdate } = require('../models/users');

var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title : 'Express'});
});

router.get('/homepage', async (req, res, next) => {


if(req.session.dataCardTrain == undefined){
  req.session.dataCardTrain = []
}

  res.render('home', { title: 'Express', city, date });
})

router.get('/no-train', async (req, res, next) => {
  res.render('notrain', { title: 'Sorry, no train' });
})

router.post('/trains', async (req, res, next) => {

    var searchTrains = await journeyModel.find({
      departure: req.body.from,
      arrival: req.body.to,
      date: req.body.date
    })
    console.log(searchTrains);

    if (searchTrains.length == 0){
      console.log('no train')
      res.redirect('/no-train')
    } else {
      console.log('ok train')
      res.render('trains', {title: "Available Trains", searchTrains, date: req.body.date} );
    }  
})

router.get('/tickets', async (req, res, next) => {

var trainInCard = await journeyModel.findById(req.query.tripId);
var alreadyExists = req.session.dataCardTrain.some(train => train._id == trainInCard._id)

if(!alreadyExists) {
  req.session.dataCardTrain.push(trainInCard);
} 
res.render('tickets', {dataCardTrain: req.session.dataCardTrain });
})

router.get('/order-confirm', async (req, res, next) => {
    //var train = await journeyModel.findById(req.query.tripId);
    var trains = JSON.parse(req.query.trains)
    var trainsIds = []
    trains.forEach(train => trainsIds.push(train._id))
    var updatedUser = await userModel.findByIdAndUpdate(req.session.user.id, { journeys: trainsIds}, { new: true })
    res.redirect('/homepage')

})

router.get('/last-trips', async function(req, res, next) {
  console.log(req.session.user);
  var userLastTrip = await userModel.findById(req.session.user.id).populate("journeys");
  console.log(userLastTrip);
  res.render('last-trips', { dataCardTrain: userLastTrip.journeys });
});

module.exports = router;
