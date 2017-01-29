(function () {
  'use strict';

  angular
    .module('flights')
    .controller('FlightsController', FlightsController);

  FlightsController.$inject = ['$scope', 'flightResolve', 'Authentication'];

  function FlightsController($scope, flight, Authentication) {
    var vm = this;

    vm.flight = flight;
    vm.authentication = Authentication;
  }
}());
