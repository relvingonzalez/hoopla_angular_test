'use strict';

////
// You can learn all about the Hoopla API at https://developer.hoopla.net/
////

angular.module('hooplaAngularTest.models')
  .factory('User', function($http, Constants) {
    return {
      index: function index() {
        return $http({
          method : 'GET',
          url: Constants.API_PREFIX + '/users',
        });
      }
    };
  });
