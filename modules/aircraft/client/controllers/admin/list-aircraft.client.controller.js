(function () {
  'use strict';

  angular
    .module('aircraft.admin')
    .controller('AircraftAdminListController', AircraftAdminListController);

  AircraftAdminListController.$inject = ['AircraftService'];

  function AircraftAdminListController(AircraftService) {
    var vm = this;

    vm.aircraft = AircraftService.query();
  }
}());
