'use strict';

angular.module('hooplaAngularTest')
  .controller('MetricsCtrl', function ($scope, Metric) {
    Metric.index().then(
      function metricIndexSuccess(response) {
        $scope.metrics = response.data;
      },
      function metricIndexError(response) {
        console.log('ERROR FETCHING METRIC INDEX', response);
      }
    );
  });
