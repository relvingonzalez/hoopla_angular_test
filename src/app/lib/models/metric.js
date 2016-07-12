'use strict';

////
// You can learn all about the Hoopla API at https://developer.hoopla.net/
////

angular.module('hooplaAngularTest.models')
  .factory('Metric', function($resource) {

    var metric_list_content_type = 'application/vnd.hoopla.metric-list+json';

    return $resource('https://api.hoopla.net/metrics/:metricId', {metricId:'@id'}, {
      'index':  {
        method : 'GET',
        isArray : true,
        headers : {
          'Accept' : metric_list_content_type,
          'Content-Type' : metric_list_content_type
        }
      }
    });
  });
