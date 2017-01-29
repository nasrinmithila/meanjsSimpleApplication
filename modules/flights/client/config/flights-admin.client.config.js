(function () {
  'use strict';

  // Configuring the Flights Admin module
  angular
    .module('flights.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Flights',
      state: 'admin.flights.list'
    });
  }
}());
