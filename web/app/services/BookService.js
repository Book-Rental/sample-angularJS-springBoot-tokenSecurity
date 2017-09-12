'use strict';

app.service('BookService', ['propertiesConstant', '$http', function(propertiesConstant,
$http) {

  var get = function() {
    return $http.get(propertiesConstant.API_URL + 'rest/book');
  };

  var getById = function(id) {
    return $http.get(propertiesConstant.API_URL + 'rest/book/' + id);
  };

  return {
    get: get,
    getById: getById
  };

}]);
