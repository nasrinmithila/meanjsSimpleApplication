(function () {
  'use strict';

  angular
    .module('flights.admin')
    .constant('_', function($window) {
      return $window._;
    })
    .controller('FlightsAdminController', FlightsAdminController);

  FlightsAdminController.$inject = ['$scope', '$state', '$window', 'flightResolve', 'AircraftService', 'Authentication', 'Notification'];

  function FlightsAdminController($scope, $state, $window, flight, AircraftService, Authentication, Notification) {
    var vm = this;
    vm.flight = flight;
    vm.aircraft = AircraftService.query(function() {
      if (vm.flight) {
        _.each(vm.aircraft, function(index, key) {
          if (index._id === vm.flight.aircraft._id) {
            vm.flight.aircraft = index;
          }
        });
      }
    });
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    // Remove existing Flight
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.flight.$remove(function() {
          $state.go('admin.flights.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Flight deleted successfully!' });
        });
      }
    }
    // Save Flight
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.flightForm');
        return false;
      }

      vm.flight.date = new Date(vm.flight.date);

      if (!vm.flight.date instanceof Date) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.flightForm');
        return false;
      }

      vm.flight.departureAirport = vm.flight.departureAirport.toUpperCase();
      vm.flight.arrivalAirport = vm.flight.arrivalAirport.toUpperCase();
      // Create a new flight, or update the current instance
      vm.flight.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.flights.list'); // should we send the User to the list or the updated Flight's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Flight saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Flight save error!' });
      }
    }
  }
}());
