'use strict';

// access token allows access to api calls
// customer_id and user_id allow access to specific info within the api
// when the access_token is expired, refresh it with refresh token
// log out the user if they are logged in and get a 401
// redirect user to root with alert if they get a 403

angular.module('hooplaAngularTest')
  .factory('oauthInterceptor', function($rootScope, $injector, $q, $cookieStore, Constants) {
    var getAuthToken = function (response) {
      var deferred = $q.defer();

      var endpoint = '';

      var refresh_token = $cookieStore.get('refresh_token');

      // If there's already a refresh token available, use it
      // Otherwise, authenticate the client for the first time
      if (refresh_token) {
        endpoint = 'https://api.hoopla.net/oauth2/token?grant_type=refresh_token&client_secret=' + Constants.CLIENT_SECRET + '&client_id=' + Constants.CLIENT_ID + '&refresh_token=' + refresh_token;
      } else {
        endpoint = 'https://api.hoopla.net/oauth2/token?client_secret=' + Constants.CLIENT_SECRET + '&client_id=' + Constants.CLIENT_ID + '&grant_type=client_credential';
      }

      $injector.get('$http')
        .post(endpoint)
        .success(function (tokenResponse) {
          // Received a token, execute the initial request
          $cookieStore.put('access_token', 'BEARER ' + tokenResponse.access_token);
          $cookieStore.put('refresh_token', tokenResponse.refresh_token);

          response.config.headers = response.config.headers || {};
          response.config.headers.Authorization = $cookieStore.get('access_token');

          // Execute original request
          $injector.get('$http')(response.config).then(function (postAuthResponse) {
            return deferred.resolve(postAuthResponse);
          }, function (postAuthResponse) {
            return deferred.reject(postAuthResponse);
          });
        })
        .error(function (response) {
          return deferred.reject(response);
        });

      return deferred.promise;
    };

    var successCallback = function (response) {
      $rootScope.http = $rootScope.http || $injector.get('$http');

      var newAuthToken = response.headers('Authorization');
      if (newAuthToken) {
        $cookieStore.put('access_token', newAuthToken);
      }

      return response;
    };

    var errorCallback = function (response) {
      $rootScope.http = $rootScope.http || $injector.get('$http');

      // When the session expires and the user is trying to load the home page
      if (response.status === 403) {
        console.error('Forbidden', response);
      } else if (response.status === 401) {
        if (response.data.message.match(/cannot be authenticated/)) {
          console.error('Invalid Client ID or Secret. Please check the constants in index.js.', response);
        } else {
          // Not authorized and there is no token set
          return getAuthToken(response);
        }
      } else if (response.status === 402) {
        console.error('This action is disabled while your account is expired.', response);
      }

      return $q.reject(response);
    };

    var requestCallback = function (config) {
      $rootScope.auth = $rootScope.auth || {};
      $rootScope.auth.access_token = $rootScope.auth.access_token || '';

      config.headers = config.headers || {};
      config.headers.Authorization = $cookieStore.get('access_token');

      return config;
    };

    return {
      request: requestCallback,
      response: successCallback,
      responseError: errorCallback
    };
  })
  .config(function ($httpProvider, $rootScopeProvider) {
    $rootScopeProvider.auth = {};
    $httpProvider.interceptors.push('oauthInterceptor');
  });
