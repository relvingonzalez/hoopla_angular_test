'use strict';

angular.module('hooplaAngularTest.models', ['ngResource']);
angular.module('hooplaAngularTest', ['hooplaAngularTest.models','ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap'])
  .constant('Constants', {
    // visit https://app.hoopla.net/configuration/settings to provision a Client ID and Secret.
    'CLIENT_ID'     : 'CHANGEME',
    'CLIENT_SECRET' : 'CHANGEME',
    'API_PREFIX'    : 'https://api.hoopla.net'
  })
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
      .state('metrics', {
        url: '/',
        templateUrl: 'app/views/metrics.html',
        controller: 'MetricsCtrl'
      })
      .state('metric_values', {
        url: '/metric/:id',
        templateUrl: 'app/views/metric_values.html',
        controller: 'MetricValuesCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;
