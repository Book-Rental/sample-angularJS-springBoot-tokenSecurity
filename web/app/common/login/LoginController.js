'use strict';
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when("/login", {
      templateUrl: "common/login/login.html"
    });
}]);
app.controller('LoginController', ['$location', '$rootScope', '$scope', //
  'UserService', '$cookieStore', '$localStorage', '$route', //
  function($location, $rootScope, $scope, UserService, $cookieStore, $localStorage, $route) {

    $scope.credentials = {};
    $scope.login = function() {
      var data = $.param({login: $scope.credentials.login, password: $scope.credentials.password});
      console.log('data', data);
      UserService.login(data).then(function(response) {
        var userToken = response.data;
        $localStorage.userToken = userToken;
        $cookieStore.put('userToken', userToken);
        if ($scope.rememberMe) {
          $cookieStore.put('userToken', userToken);
        }
        $route.reload();
      //$location.path("/");
      /*
      UserService.get(function(user) {
        $rootScope.user = user;
        $location.path("/");
      });
      */
      });
    };
  }]);
