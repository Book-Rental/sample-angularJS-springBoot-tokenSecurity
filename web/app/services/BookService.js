'use strict';

app.service('BookService', ['propertiesConstant', '$http', '$q', function(propertiesConstant,
$http, $q) {

  var get = function() {
    return $http.get(propertiesConstant.API_URL + 'rest/book');
  };

  var getById = function(id) {
    return $http.get(propertiesConstant.API_URL + 'rest/book/' + id);
  };

  var save = function(book) {
    return $http.post(propertiesConstant.API_URL + 'rest/book/', book);
  };

  var deleteBook = function(book) {
    if (book && book.id) {
      return $http.delete(propertiesConstant.API_URL + 'rest/book/' + book.id);
    }
    return $q.when(book);
  };

  return {
    get: get,
    getById: getById,
    save: save,
    deleteBook: deleteBook
  };

}]);
