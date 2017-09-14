'use strict';

angular.module('hooplaAngularTest')
  .controller('MetricsCtrl',['$state','Metric', function ($state, Metric) {
    var vm = this;

    function activate()
    {
      Metric.index().then(
        function metricIndexSuccess(response) {
          vm.metrics = response.data;
        },
        function metricIndexError(response) {
          console.log('ERROR FETCHING METRIC INDEX', response);
        }
      );
    }

    activate();

  }]);
