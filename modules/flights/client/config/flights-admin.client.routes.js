(function () {
  'use strict';

  angular
    .module('flights.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.flights', {
        abstract: true,
        url: '/flights',
        template: '<ui-view/>'
      })
      .state('admin.flights.list', {
        url: '',
        templateUrl: '/modules/flights/client/views/admin/list-flights.client.view.html',
        controller: 'FlightsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.flights.create', {
        url: '/create',
        templateUrl: '/modules/flights/client/views/admin/form-flight.client.view.html',
        controller: 'FlightsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          flightResolve: newFlight
        }
      })
      .state('admin.flights.edit', {
        url: '/:flightId/edit',
        templateUrl: '/modules/flights/client/views/admin/form-flight.client.view.html',
        controller: 'FlightsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          flightResolve: getFlight
        }
      });
  }

  getFlight.$inject = ['$stateParams', 'FlightsService'];

  function getFlight($stateParams, FlightsService) {
    return FlightsService.get({
      flightId: $stateParams.flightId
    }).$promise;
  }

  newFlight.$inject = ['FlightsService'];

  function newFlight(FlightsService) {
    return new FlightsService();
  }
}());
