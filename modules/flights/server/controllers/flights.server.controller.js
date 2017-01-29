'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Flight = mongoose.model('Flight'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an flight
 */
exports.create = function (req, res) {
  var flight = new Flight(req.body);
  flight.user = req.user;

  flight.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(flight);
    }
  });
};

/**
 * Show the current flight
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var flight = req.flight ? req.flight.toJSON() : {};
  // Add a custom field to the Flight, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Flight model.
  flight.isCurrentUserOwner = !!(req.user && flight.user && flight.user.toString() === req.user._id.toString());
  res.json(flight);
};

/**
 * Update an flight
 */
exports.update = function (req, res) {
  var flight = req.flight;
  flight.date = req.body.date;
  flight.departureAirport = req.body.departureAirport;
  flight.arrivalAirport = req.body.arrivalAirport;
  flight.price = req.body.price;
  flight.aircraft = req.body.aircraft;

  flight.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(flight);
    }
  });
};

/**
 * Delete an flight
 */
exports.delete = function (req, res) {
  var flight = req.flight;

  flight.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(flight);
    }
  });
};

/**
 * List of Flights
 */
exports.list = function (req, res) {
  Flight.find().sort('-created').populate('aircraft').exec(function (err, flights) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(flights);
    }
  });
};

/**
 * Flight middleware
 */
exports.flightByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Flight is invalid'
    });
  }

  Flight.findById(id).populate('aircraft').exec(function (err, flight) {
    if (err) {
      return next(err);
    } else if (!flight) {
      return res.status(404).send({
        message: 'No flight with that identifier has been found'
      });
    }
    req.flight = flight;
    next();
  });
};
