'use strict';

angular.module('hooplaAngularTest')
  .controller('MetricValuesCtrl', function ($scope, Metric, $stateParams, User) {
    // Function used by the UI to update a metric value
    $scope.updateValue = function(val) {
      Metric.updateValue(val).then(
        function updateValueSuccess(response) {
          console.log('SUCCESSFULLY UPDATED METRIC VALUE', response);
        },
        function updateValueError(response) {
          console.log('ERROR UPDATING METRIC VALUE', response);
        }
      );
    };

    // fetch all metrics
    Metric.index().then(
      function metricIndexSuccess(response) {
        var metrics = response.data;

        // set the metric metadata into scope
        $scope.metric = metrics[$stateParams.id];

        // find the right value href for the selected metric
        var values_href = null;
        $scope.metric.links.forEach(function (link) {
          if (link.rel === 'list_metric_values') {
            values_href = link.href;
          }
        });
        if (!values_href) {
          console.log('ERROR FINDING list_metric_values HREF');
          return;
        }

        // fetch values for the selected metric
        Metric.values(values_href).then(
          function metricValuesSuccess(response) {
            $scope.values = response.data;
            // now fetch all the users so we can show email address, name, etc
            User.index().then(
              function userIndexSuccess(response) {
                $scope.users = {};
                // turn the returned array into a hash, keyed by user href to
                // make it easy to use in the view
                response.data.forEach(function(val) {
                  $scope.users[val.href] = val;
                });
              },
              function userIndexError(response) {
                console.log('ERROR FETCHING USERS', response);
              }
            );
          },
          function metricValuesError(response) {
            console.log('ERROR FETCHING VALUES', response);
          }
        );
      },
      function metricIndexError(response) {
        console.log('ERROR FETCHING METRICS', response);
      }
    );
  });

