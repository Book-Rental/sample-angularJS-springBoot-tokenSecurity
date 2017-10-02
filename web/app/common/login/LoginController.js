(function() {

  angular.module('app').config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when("/login", {
        templateUrl: "common/login/login.html"
      });
  }]);

  var LoginController = function($location, $rootScope, $scope, UserService, $cookieStore, $localStorage, $route) {

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

  };

  LoginController.$inject = ['$location', '$rootScope', '$scope', //
    'UserService', '$cookieStore', '$localStorage', '$route'];

  angular.module('app').controller('LoginController', LoginController);

}());

