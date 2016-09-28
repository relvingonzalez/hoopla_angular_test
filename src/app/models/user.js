'use strict';

////
// You can learn all about the Hoopla API at https://developer.hoopla.net/
////

angular.module('hooplaAngularTest.models')
  .factory('User', function($http, $q, Root) {
    return {
      index: function index() {
        var users_index_href = null;
        return Root.index().then(
          function rootIndexSuccess(response) {
            response.data.links.forEach(function (link) {
              if (link.rel === 'list_users') {
                users_index_href = link.href;
              }
            });
            if (!users_index_href) {
              // there was a problem finding the URL
              return $q.reject('Cannot get users index URL');
            }

            // found the URL, make the request and return the promise
            return $http({
              method : 'GET',
              url: users_index_href,
              cache: true
            });
          },
          function rootIndexError(response) {
            console.log('Could not fetch API root', response);
          }
        );
      }
    };
  });
