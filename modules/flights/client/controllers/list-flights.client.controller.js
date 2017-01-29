(function () {
  'use strict';

  angular
    .module('flights')
    .controller('FlightsListController', FlightsListController);

  FlightsListController.$inject = ['AircraftService', 'FlightsService', '$scope'];

  function FlightsListController(AircraftService, FlightsService, $scope) {
    var vm = this;
    var flights = FlightsService.query();
    var aircraft = AircraftService.query();
    vm.flights = flights;
  }
}());
