(function (app) {
  'use strict';

  app.registerModule('aircraft', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('aircraft.admin', ['core.admin']);
  app.registerModule('aircraft.admin.routes', ['core.admin.routes']);
  app.registerModule('aircraft.services');
  app.registerModule('aircraft.routes', ['ui.router', 'core.routes', 'aircraft.services']);
}(ApplicationConfiguration));
