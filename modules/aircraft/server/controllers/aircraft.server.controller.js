'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  _ = require('lodash'),
  mongoose = require('mongoose'),
  Aircraft = mongoose.model('Aircraft'),
  Flight = mongoose.model('Flight'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an aircraft
 */
exports.create = function (req, res) {
  var aircraft = new Aircraft(req.body);
  aircraft.user = req.user;

  aircraft.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(aircraft);
    }
  });
};

/**
 * Show the current aircraft
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var aircraft = req.aircraft ? req.aircraft.toJSON() : {};

  // Add a custom field to the Aircraft, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Aircraft model.
  aircraft.isCurrentUserOwner = !!(req.user && aircraft.user && aircraft.user._id.toString() === req.user._id.toString());

  res.json(aircraft);
};

/**
 * Update an aircraft
 */
exports.update = function (req, res) {
  var aircraft = req.aircraft;

  aircraft.name = req.body.name;
  aircraft.category = req.body.category;
  aircraft.seatNo = req.body.seatNo;
  aircraft.price = req.body.price;
  aircraft.airport = req.body.airport;

  aircraft.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(aircraft);
    }
  });
};

/**
 * Delete an aircraft
 */
exports.delete = function (req, res) {
  var aircraft = req.aircraft;
  aircraft.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      Flight.find({ aircraft: aircraft._id })
        .exec(function (err, flights) {
          _.each(flights, function(flight) {
            flight.remove();
          });
        });
      res.json(aircraft);
    }
  });
};

/**
 * List of Aircraft
 */
exports.list = function (req, res) {
  Aircraft.find().sort('-created').populate('user', 'displayName').exec(function (err, aircraft) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(aircraft);
    }
  });
};

/**
 * Aircraft middleware
 */
exports.aircraftByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Aircraft is invalid'
    });
  }

  Aircraft.findById(id).populate('user', 'displayName').exec(function (err, aircraft) {
    if (err) {
      return next(err);
    } else if (!aircraft) {
      return res.status(404).send({
        message: 'No aircraft with that identifier has been found'
      });
    }
    req.aircraft = aircraft;
    next();
  });
};
