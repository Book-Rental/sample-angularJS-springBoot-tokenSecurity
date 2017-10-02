'use strict';

app.service('AppSettingService', ['$http', 'propertiesConstant', function($http, propertiesConstant) {

  var getAppSettingValue = function(name) {
    return $http.get(propertiesConstant.API_URL + 'rest/appsetting/' + name);
  };

  return {
    getAppSettingValue: getAppSettingValue
  };
}]);
