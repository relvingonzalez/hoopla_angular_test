'use strict';

////
// You can learn all about the Hoopla API at https://developer.hoopla.net/
////

angular.module('hooplaAngularTest.models')
  .factory('Metric', function($http, $q, Root) {
    return {
      index: function index() {
        // find the right value href for the metric index
        var metrics_index_href = null;
        return Root.index().then(
          function rootIndexSuccess(response) {
            response.data.links.forEach(function (link) {
              if (link.rel === 'list_metrics') {
                metrics_index_href = link.href;
              }
            });

            if (!metrics_index_href) {
              // there was a problem finding the URL
              return $q.reject('Cannot get metrics index URL');
            }

            // found the URL, make the request and return the promise
            return $http({
              method : 'GET',
              url: metrics_index_href,
              cache: true
            });
          },
          function rootIndexError(response) {
            console.log('Could not fetch API root', response);
          }
        );
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
