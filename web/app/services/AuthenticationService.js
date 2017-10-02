(function() {

  var authenticationService = function($rootScope, $http, $q, base64Service, storageService, storageConstant,
    propertiesConstant) {

    var login = function(credentials) {
      var d = $q.defer();
      $http.defaults.headers.common.Authorization = 'Basic ' +
        base64Service.encode(credentials.login + ':' + credentials.password);
      var params = {login: credentials.login, password: credentials.password};
      $http.post(propertiesConstant.API_URL + 'auth/login', params)
        .success(function(response) {
          var accessToken = response.data.token;
          $rootScope.accessToken = accessToken;
          d.resolve();
        })
        .error(function() {
          d.reject();
        });
      return d.promise;
    };

    var logout = function() {
      var d = $q.defer();
      $http.post(propertiesConstant.API_URL + 'auth/logout', null)
        .success(function() {
          storageService.removeSessionItem(storageConstant.AUTH_TOKEN);
          storageService.removeSessionItem(storageConstant.USER);
          delete $rootScope.user;
          d.resolve();
        })
        .error(function() {
          d.reject();
        });
      return d.promise;
    };

    return {
      login: login,
      logout: logout
    };
  };


  authenticationService.$inject = ['$rootScope', '$http', '$q', 'base64Service', //
    'storageService', 'storageConstant', 'propertiesConstant'];

  angular.module('app').service('authenticationService', authenticationService);

}());

