(function () {
  'use strict';

  angular
    .module('aircraft.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('aircraft', {
        abstract: true,
        url: '/aircraft',
        template: '<ui-view/>'
      })
      .state('aircraft.list', {
        url: '',
        templateUrl: '/modules/aircraft/client/views/list-aircraft.client.view.html',
        controller: 'AircraftListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Aircraft List'
        }
      })
      .state('aircraft.view', {
        url: '/:aircraftId',
        templateUrl: '/modules/aircraft/client/views/view-aircraft.client.view.html',
        controller: 'AircraftController',
        controllerAs: 'vm',
        resolve: {
          aircraftResolve: getAircraft
        },
        data: {
          pageTitle: 'Aircraft {{ aircraftResolve.name }}'
        }
      });
  }

  getAircraft.$inject = ['$stateParams', 'AircraftService'];

  function getAircraft($stateParams, AircraftService) {
    return AircraftService.get({
      aircraftId: $stateParams.aircraftId
    }).$promise;
  }
}());
