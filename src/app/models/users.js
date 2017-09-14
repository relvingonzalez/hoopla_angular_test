/**
 * Created by Relvin on 9/13/2017.
 */
(function () {
    'use strict';
  angular.module('hooplaAngularTest.models')
    .factory('Users', function($http, $q, Root) {
      return {
        get: function get(){
          var all_users_link;
          return Root.index().then(
            function rootIndexSuccess(response) {
              response.data.links.forEach(function (link) {
                if (link.rel === 'list_users') {
                  all_users_link = link.href;
                }
              });

              if (! all_users_link) {
                // there was a problem finding the URL
                return $q.reject('Cannot get users index URL');
              }

              // found the URL, make the request and return the promise
              return $http({
                method : 'GET',
                url: all_users_link,
                cache: true
              });
            },
            function rootIndexError(response) {
              return $q.reject(response);
            }
          );
        }
        }
    });

})();
