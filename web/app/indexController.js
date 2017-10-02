(function() {

  var IndexController = function($scope, $cookieStore, UserService, $location, $rootScope, $localStorage,
    AppSettingService, usSpinnerService, $timeout) {

    var self = this;

    $scope.isAuthenticated = function() {
      var userToken = $localStorage.userToken;
      return (angular.isDefined(userToken) && userToken !== null);
    };

    $scope.logout = function() {
      UserService.logout().then(function(response) {
        delete $rootScope.userToken;
        delete $localStorage.userToken;
        //$location.path("/login");      
      });
    };

    $rootScope.hasRole = function(role) {
      if ($rootScope.user === undefined) {
        return false;
      }
      if ($rootScope.user.roles[role] === undefined) {
        return false;
      }
      return $rootScope.user.roles[role];
    };

    $scope.test = 'oooo';

    $rootScope.logout = function() {
      delete $rootScope.user;
      delete $rootScope.userToken;
      $cookieStore.remove('userToken');
      $location.path("/login");
    };

    AppSettingService.getAppSettingValue('app_version').then(function(response) {
      $scope.appVersion = response.data;
    });

    $scope.startSpin = function() {
      usSpinnerService.spin('spinner-1');
    };
    $scope.stopSpin = function() {
      usSpinnerService.stop('spinner-1');
    };

    self.alertModalApi = {};

    $rootScope.showNotif = function(message) {
      self.alertModalApi.message = message;
      self.alertModalApi.show();
      setTimeout(function() {
        self.alertModalApi.hide();
      }, 1500);
    };

  };

  IndexController.$inject = ['$scope', '$cookieStore', //
    'UserService', '$location', '$rootScope', '$localStorage', 'AppSettingService', 'usSpinnerService', '$timeout'];

  angular.module('app').controller('IndexController', IndexController);

}());
