'use strict';

angular.module('hooplaAngularTest')
  .controller('MainCtrl', function ($scope, Metric) {
    $scope.metrics = Metric.index();
  });
