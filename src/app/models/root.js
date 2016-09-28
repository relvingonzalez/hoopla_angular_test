'use strict';

////
// You can learn all about the Hoopla API at https://developer.hoopla.net/
////

angular.module('hooplaAngularTest.models')
  .factory('Root', function($http, Constants) {
    // The Hoopla API root returns a set of useful top-level API URLs.
    // Use those URLs rather than assembling your own URLs.
    return {
      index: function index() {
        return $http({
          method : 'GET',
          url: Constants.API_PREFIX + '/',
          cache: true
        });
      }
    };
  });

