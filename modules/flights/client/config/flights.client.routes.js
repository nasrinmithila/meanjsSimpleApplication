(function () {
  'use strict';

  angular
    .module('flights.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('flights', {
        abstract: true,
        url: '/flights',
        template: '<ui-view/>'
      })
      .state('flights.list', {
        url: '',
        templateUrl: '/modules/flights/client/views/list-flights.client.view.html',
        controller: 'FlightsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Flights List'
        }
      })
      .state('flights.view', {
        url: '/:flightId',
        templateUrl: '/modules/flights/client/views/view-flight.client.view.html',
        controller: 'FlightsController',
        controllerAs: 'vm',
        resolve: {
          flightResolve: getFlight
        },
        data: {
          pageTitle: 'Flight {{ flightResolve.date }}'
        }
      });
  }

  getFlight.$inject = ['$stateParams', 'FlightsService'];

  function getFlight($stateParams, FlightsService) {
    return FlightsService.get({
      flightId: $stateParams.flightId
    }).$promise;
  }
}());
