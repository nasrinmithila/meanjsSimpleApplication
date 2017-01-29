(function () {
  'use strict';

  angular
    .module('flights.admin')
    .controller('FlightsAdminListController', FlightsAdminListController);

  FlightsAdminListController.$inject = ['FlightsService', '$scope', 'AircraftService'];

  function FlightsAdminListController(FlightsService, $scope, AircraftService) {
    var vm = this;
    var flights = FlightsService.query();
    var aircraft = AircraftService.query();
    vm.flights = flights;
  }
}());
