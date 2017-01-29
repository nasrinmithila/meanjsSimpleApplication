(function () {
  'use strict';

  // Configuring the aircraft Admin module
  angular
    .module('aircraft.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Aircraft Fleet',
      state: 'admin.aircraft.list'
    });
  }
}());
