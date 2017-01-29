(function () {
  'use strict';

  angular
    .module('flights')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Flights',
      state: 'flights',
      type: 'dropdown',
      roles: ['*'],
      position: 2
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'flights', {
      title: 'List Flights',
      state: 'flights.list',
      roles: ['*']
    });
  }
}());
