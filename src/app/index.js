'use strict';

angular.module('hooplaAngularTest.models', ['ngResource']);
angular.module('hooplaAngularTest', ['hooplaAngularTest.models','ngAnimate', 'LocalStorageModule', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap'])
  .constant('Constants', {
    // visit https://app.hoopla.net/configuration/settings to provision a Client ID and Secret.
    'CLIENT_ID'     : '20bfdc8e-66ec-4cd0-9143-52b6e25da016',
    'CLIENT_SECRET' : 'M7ARncS7q3gnAWVPKI3DKs1ubMgNY1pGlC+xUs8h3DE=',
    'API_PREFIX'    : 'https://api.hoopla.net'
  })
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
      .state('metrics', {
        url: '/',
        templateUrl: 'app/views/metrics.html',
        controller: 'MetricsCtrl',
        controllerAs:'MetricsCtrl'
      })

      .state('values',{
        url: '/values',
        params: {metricUrl: null},
        templateUrl: 'app/views/values.html',
        controller: 'ValuesCtrl',
        controllerAs:'ValuesCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;
