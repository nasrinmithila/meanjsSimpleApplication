(function () {
  'use strict';

  angular
    .module('aircraft.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.aircraft', {
        abstract: true,
        url: '/aircraft',
        template: '<ui-view/>'
      })
      .state('admin.aircraft.list', {
        url: '',
        templateUrl: '/modules/aircraft/client/views/admin/list-aircraft.client.view.html',
        controller: 'AircraftAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.aircraft.create', {
        url: '/create',
        templateUrl: '/modules/aircraft/client/views/admin/form-aircraft.client.view.html',
        controller: 'AircraftAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          aircraftResolve: newAircraft
        }
      })
      .state('admin.aircraft.edit', {
        url: '/:aircraftId/edit',
        templateUrl: '/modules/aircraft/client/views/admin/form-aircraft.client.view.html',
        controller: 'AircraftAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          aircraftResolve: getAircraft
        }
      });
  }

  getAircraft.$inject = ['$stateParams', 'AircraftService'];

  function getAircraft($stateParams, AircraftService) {
    return AircraftService.get({
      aircraftId: $stateParams.aircraftId
    }).$promise;
  }

  newAircraft.$inject = ['AircraftService'];

  function newAircraft(AircraftService) {
    return new AircraftService();
  }
}());
