'use strict';

////
// You can learn all about the Hoopla API at https://developer.hoopla.net/
////

angular.module('hooplaAngularTest.models')
  .factory('Metric', function($http, Constants) {
    return {
      index: function index() {
        return $http({
          method : 'GET',
          url: Constants.API_PREFIX + '/metrics',
          cache: true
        });
      },
      values: function values(href) {
        return $http({
          method: 'GET',
          url: href
        });
      },
      updateValue: function updateValue(obj) {
        return $http({
          method: 'PUT',
          url: obj.href,
          data: obj,
          headers: { 'Content-Type': 'application/vnd.hoopla.metric-value+json' }
        });
      }
    };
  });
