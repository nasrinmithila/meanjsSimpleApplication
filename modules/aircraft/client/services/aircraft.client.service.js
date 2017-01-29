(function () {
  'use strict';

  angular
    .module('aircraft.services')
    .factory('AircraftService', AircraftService);

  AircraftService.$inject = ['$resource', '$log'];

  function AircraftService($resource, $log) {
    var Aircraft = $resource('/api/aircraft/:aircraftId', {
      aircraftId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Aircraft.prototype, {
      createOrUpdate: function () {
        var aircraft = this;
        return createOrUpdate(aircraft);
      }
    });

    return Aircraft;

    function createOrUpdate(aircraft) {
      if (aircraft._id) {
        return aircraft.$update(onSuccess, onError);
      } else {
        return aircraft.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(aircraft) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
