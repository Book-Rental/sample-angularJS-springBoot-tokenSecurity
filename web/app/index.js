(function() {

  angular.module('templates', []);
  angular.module('app', ['ngStorage', 'ngRoute', 'ngCookies', 'templates', 'angularSpinner']);

  angular.module('app').config(['$qProvider', '$routeProvider', '$locationProvider',
    '$httpProvider', function($qProvider, $routeProvider, $locationProvider, $httpProvider) {

      $routeProvider.otherwise({templateUrl: 'common/error/error.html'});

      $qProvider.errorOnUnhandledRejections(false);

      $locationProvider.hashPrefix('');

      /* Register error provider that shows message on failed requests or redirects to login page on
      * unauthenticated requests */
      $httpProvider.interceptors.push(['$q', '$rootScope', '$location', //
        function($q, $rootScope, $location) {
          var responseError = function(rejection) {
            var status = rejection.status;
            var method = rejection.config.method;
            var url = rejection.config.url;
            if (status == 401) {
              $location.path("/login");
            } else {
              $rootScope.error = {status: 500, message: 'System error'};
            }
            return $q.reject(rejection);
          };
          return {
            responseError: responseError
          };
        }]);

      /* Registers auth token interceptor, auth token is either passed by header 
      * or by query parameter as soon as there is an authenticated user */
      $httpProvider.interceptors.push(['$q', '$rootScope', '$location', '$cookieStore', '$localStorage',
        function($q, $rootScope, $location, $cookieStore, $localStorage) {
          var request = function(config) {
            var userToken = $localStorage.userToken;
            if (angular.isDefined(userToken)) {
              config.headers['X-AUTH-TOKEN'] = JSON.stringify(userToken);
            }
            if (angular.isDefined(userToken) && $location.path() === '/login') {
              $location.path('/');
            }
            return config;
          };
          return {
            request: request
          };
        }]);


      /* upadate loadingCount to show or hide the loading spinner */
      $httpProvider.interceptors.push(['$q', '$rootScope',
        function($q, $rootScope) {
          var loadingCount = 0;

          return {
            request: function(config) {
              if (++loadingCount === 1) {
                $rootScope.$broadcast('loading:progress');
              }
              return config || $q.when(config);
            },

            response: function(response) {
              if (--loadingCount === 0) {
                $rootScope.$broadcast('loading:finish');
              }
              return response || $q.when(response);
            },

            responseError: function(response) {
              if (--loadingCount === 0) {
                $rootScope.$broadcast('loading:finish');
              }
              return $q.reject(response);
            }
          };
        }
      ]);

    }]);

  angular.module('app').run(['$rootScope', '$location', '$cookieStore', '$localStorage', 'usSpinnerService', '$timeout',
    function($rootScope, $location, $cookieStore, $localStorage, usSpinnerService, $timeout) {


      /* Reset error when a new view is loaded */
      $rootScope.$on('$viewContentLoaded', function() {
        delete $rootScope.error;
      });

      $rootScope.$on("$locationChangeStart", function(event, next, current) {
        delete $rootScope.error;
      });

      // Go to home page when the url is invalid
      $rootScope.$on('$stateNotFound', function() {
        //event.preventDefault();
        console.log('cccccc');
        if (angular.isDefined($localStorage.userToken) && $localStorage.userToken !== null) {
          $location.path('/');
        }
      });

      $rootScope.$on('$stateChangeError', function(event) {
        console.log('cccccc');
      });


      $rootScope.$on('loading:progress', function() {
        $timeout(function() {
          usSpinnerService.spin('loading-spinner');
        }, 100);
      });

      $rootScope.$on('loading:finish', function() {
        $timeout(function() {
          usSpinnerService.stop('loading-spinner');
        }, 100);
      });

      $rootScope.initialized = true;

    }]);

}());
