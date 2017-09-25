'use strict';

app.service('BookService', ['propertiesConstant', '$http', function(propertiesConstant,
$http) {

  var get = function() {
    return $http.get(propertiesConstant.API_URL + 'rest/book');
  };

  var getById = function(id) {
    return $http.get(propertiesConstant.API_URL + 'rest/book/' + id);
  };

  var save = function(book){
    return $http.post(propertiesConstant.API_URL + 'rest/book/', book);
  };

  return {
    get: get,
    getById: getById,
    save: save
  };

}]);
