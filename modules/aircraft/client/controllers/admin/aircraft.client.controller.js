(function () {
  'use strict';

  angular
    .module('aircraft.admin')
    .controller('AircraftAdminController', AircraftAdminController);

  AircraftAdminController.$inject = ['$scope', '$state', '$window', 'aircraftResolve', 'Authentication', 'Notification'];

  function AircraftAdminController($scope, $state, $window, aircraft, Authentication, Notification) {
    var vm = this;

    vm.aircraft = aircraft;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    // Remove existing Aircraft
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.aircraft.$remove(function() {
          $state.go('admin.aircraft.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Aircraft deleted successfully!' });
        });
      }
    }

    // Save Aircraft
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.aircraftForm');
        return false;
      }

      vm.aircraft.airport = vm.aircraft.airport.toUpperCase();
      // Create a new aircraft, or update the current instance
      vm.aircraft.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.aircraft.list'); // should we send the User to the list or the updated Aircraft's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Aircraft saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Aircraft save error!' });
      }
    }
  }
}());
