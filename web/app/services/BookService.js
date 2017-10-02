(function() {

  var BookService = function(propertiesConstant, $http, $q) {

    var get = function() {
      return $http.get(propertiesConstant.API_URL + 'rest/book');
    };

    var getInStock = function() {
      return $http.get(propertiesConstant.API_URL + 'rest/book/instock');
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
      deleteBook: deleteBook,
      getInStock: getInStock
    };
  };


  BookService.$inject = ['propertiesConstant', '$http', '$q'];

  angular.module('app').service('BookService', BookService);

}());

