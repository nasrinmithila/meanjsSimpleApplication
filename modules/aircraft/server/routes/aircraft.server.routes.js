'use strict';

/**
 * Module dependencies
 */
var aircraftPolicy = require('../policies/aircraft.server.policy'),
  aircraft = require('../controllers/aircraft.server.controller');

module.exports = function (app) {
  // Aircraft collection routes
  app.route('/api/aircraft').all(aircraftPolicy.isAllowed)
    .get(aircraft.list)
    .post(aircraft.create);

  // Single aircraft routes
  app.route('/api/aircraft/:aircraftId').all(aircraftPolicy.isAllowed)
    .get(aircraft.read)
    .put(aircraft.update)
    .delete(aircraft.delete);

  // Finish by binding the aircraft middleware
  app.param('aircraftId', aircraft.aircraftByID);
};
