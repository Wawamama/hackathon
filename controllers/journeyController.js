const stripe = require('stripe')('sk_test_51JY5vMBB0UFLtaEL2pB5vTENS3NGIXNSaDK33Pl9YsparAfOjEEWZMfQOBBXlDCJB9Vz6ZPs4xEh40IgKF5EWaSr00D9Wn4IRQ');
var express = require('express');
var router = express.Router();

var journeyModel = require('../models/journeys')
var userModel = require('../models/users');

exports.getTrains = async (req, res, next) => {
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
}

exports.getTickets = async (req, res, next) => {
    var trainInCard = await journeyModel.findById(req.query.tripId);
    var alreadyExists = req.session.dataCardTrain.some(train => train._id == trainInCard._id)
  
    if(!alreadyExists) {
      req.session.dataCardTrain.push(trainInCard);
    } 
    res.render('tickets', {dataCardTrain: req.session.dataCardTrain });
  }

  exports.confirmOrder = async (req, res, next) => {
    var trains = JSON.parse(req.query.trains)
    var trainsIds = []
    trains.forEach(train => trainsIds.push(train._id))
    var updatedUser = await userModel.findByIdAndUpdate(req.session.user.id, { journeys: trainsIds}, { new: true })
    res.redirect('/journeys/checkout')
  }

  exports.getLastTrips = async (req, res, next) => {
    console.log(req.session.user);
    var userLastTrip = await userModel.findById(req.session.user.id).populate("journeys");
    console.log(userLastTrip);
    res.render('last-trips', { dataCardTrain: userLastTrip.journeys });
  }

<<<<<<< HEAD
  exports.launchToSpace = async (req, res, next) => {
      const cities = await journeyModel.find({})
  }
=======
  exports.stripe = async (req, res) => {
    var items = [];
    for (var i =0; i<req.session.dataCardTrain.length; i++) {
      items.push({
          price_data: {
            currency: 'eur',
            product_data: {
              name: req.session.dataCardTrain[i].departure + "/" + req.session.dataCardTrain[i].arrival,
            },
            unit_amount: req.session.dataCardTrain[i].price*100,
          },
          quantity: 1,
      })
    }
    const session = await stripe.checkout.sessions.create({
      line_items: items,
      payment_method_types: [
        'card',
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000',
    });
  
    res.redirect(303, session.url)
  };
  
  
  router.get('/success', (req, res) => {
    res.render('success');
   });
  
  
  router.get('/cancel', (req, res) => {
    res.render('index');
   });
  
>>>>>>> 0234b02daedc0de4d5c1fd3dfe645c81cc413652
