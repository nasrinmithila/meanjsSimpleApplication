(function () {
  'use strict';

  angular
    .module('flights.services')
    .factory('FlightsService', FlightsService);

  FlightsService.$inject = ['$resource', '$log'];

  function FlightsService($resource, $log) {
    var Flight = $resource('/api/flights/:flightId', {
      flightId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Flight.prototype, {
      createOrUpdate: function () {
        var flight = this;
        return createOrUpdate(flight);
      }
    });

    return Flight;

    function createOrUpdate(flight) {
      if (flight._id) {
        return flight.$update(onSuccess, onError);
      } else {
        return flight.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(flight) {
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
