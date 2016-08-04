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
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;
