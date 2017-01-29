(function () {
  'use strict';

  angular
    .module('aircraft')
    .controller('AircraftListController', AircraftListController);

  AircraftListController.$inject = ['AircraftService'];

  function AircraftListController(AircraftService) {
    var vm = this;

    vm.aircraft = AircraftService.query();
  }
}());
