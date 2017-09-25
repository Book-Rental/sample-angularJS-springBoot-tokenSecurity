angular.module('templates', []);
var app = angular.module('app', ['ngStorage', 'ngRoute', 'ngCookies', 'templates']);

app.config(['$qProvider', '$routeProvider', '$locationProvider', '$httpProvider', function($qProvider,
$routeProvider, $locationProvider, $httpProvider) {

  $qProvider.errorOnUnhandledRejections(false);

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
          $rootScope.error = method + " on " + url + " failed with status " + status;
        }
        return $q.reject(rejection);
      };
      return {
        responseError: responseError
      };
    }]);

  /* Registers auth token interceptor, auth token is either passed by header 
    * or by query parameter as soon as there is an authenticated user */
  $httpProvider.interceptors.push(['$q', '$rootScope', '$location', '$cookieStore', '$localStorage', function($q,
    $rootScope, $location, $cookieStore, $localStorage) {
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
  $locationProvider.hashPrefix('');
}]);

app.run(['$rootScope', '$location', '$cookieStore', '$localStorage', function($rootScope,
$location, $cookieStore, $localStorage) {
  /* Reset error when a new view is loaded */
  $rootScope.$on('$viewContentLoaded', function() {
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

  $rootScope.$on('$routeChangeStart', function() {
    console.log('heyyyyy');
  });

  $rootScope.initialized = true;

}]);