var express = require('express');
const mongoose = require('mongoose');

var journeyModel = require('../models/journeys')
var journeyController = require('../controllers/journeyController')

var router = express.Router();

router.post('/', journeyController.getTrains);
router.get('/tickets', journeyController.getTickets)
router.get('/order-confirm', journeyController.confirmOrder)
router.get('/last-trips', journeyController.getLastTrips);

module.exports = router;