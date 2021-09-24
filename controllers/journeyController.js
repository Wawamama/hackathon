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
    res.redirect('/homepage')
  }

  exports.getLastTrips = async (req, res, next) => {
    console.log(req.session.user);
    var userLastTrip = await userModel.findById(req.session.user.id).populate("journeys");
    console.log(userLastTrip);
    res.render('last-trips', { dataCardTrain: userLastTrip.journeys });
  }

  exports.launchToSpace = async (req, res, next) => {
      const cities = await journeyModel.find({})
  }