'use strict';

app.service('UserService', ['propertiesConstant', '$http', function(propertiesConstant,
$http) {

  var login = function(credentials) {
    var url = propertiesConstant.API_URL + 'rest/authentication/login';
    return $http({
      method: 'POST',
      url: url,
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
      data: credentials
    });
  };

  var get = function() {
    return $http.get(propertiesConstant.API_URL + 'rest/authentication/current');
  };

  var logout = function() {
    var url = propertiesConstant.API_URL + 'rest/authentication/logout';
    return $http.get(url);
  };

  return {
    login: login,
    get: get,
    logout: logout
  };
}]);
