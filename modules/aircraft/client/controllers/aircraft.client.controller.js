(function () {
  'use strict';

  angular
    .module('aircraft')
    .controller('AircraftController', AircraftController);

  AircraftController.$inject = ['$scope', 'aircraftResolve', 'Authentication'];

  function AircraftController($scope, aircraft, Authentication) {
    var vm = this;

    vm.aircraft = aircraft;
    vm.authentication = Authentication;

  }
}());
