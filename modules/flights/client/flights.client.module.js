(function (app) {
  'use strict';

  app.registerModule('flights', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('flights.admin', ['core.admin']);
  app.registerModule('flights.admin.routes', ['core.admin.routes']);
  app.registerModule('flights.services');
  app.registerModule('flights.routes', ['ui.router', 'core.routes', 'flights.services']);
}(ApplicationConfiguration));
