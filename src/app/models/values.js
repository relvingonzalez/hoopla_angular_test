/**
 * Created by Relvin on 9/13/2017.
 */
(function () {
    'use strict';

  angular.module('hooplaAngularTest.models')
    .factory('Values', function($http, $q, Root) {
      return {
        get: function get(url, owner){
          return $http({
            method: 'GET',
            url:url,
            params:{
              'owner.href' : owner
            }
          })
        },
        save: function edit(url, method, value,metric){
          var data = {};
          if(method === 'PUT')
          {
            data = {
              href: value.value.href,
              metric: {
                href:metric.href
              },
              owner: value.value.owner,
              value: value.value.value,
              updated_at: value.value.updated_at
            }
          }
          else{
            data = {
              owner: {
                href:value.href,
                kind:'user'
              },
              value: value.value.value
            }
          }
          return $http({
            method:method,
            url:url,
            headers: {
              "Content-Type": "application/vnd.hoopla.metric-value+json"
            },
            data:data
          })
        }
      };
    });

})();
