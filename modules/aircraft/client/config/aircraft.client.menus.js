(function () {
  'use strict';

  angular
    .module('aircraft')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Aircraft',
      state: 'aircraft',
      type: 'dropdown',
      roles: ['*'],
      position: 1
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'aircraft', {
      title: 'List Aircraft',
      state: 'aircraft.list',
      roles: ['*']
    });
  }
}());
