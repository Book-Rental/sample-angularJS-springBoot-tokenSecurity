app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when("/book", {
      templateUrl: "features/books/bookDetails.html"
    })
    .when("/book/:bookId", {
      templateUrl: "features/books/bookDetails.html"
    });
}]);

var BookDetailsController = function ($scope, $http, BookService, $routeParams, $location) {

  $scope.mode = 'view';
  
  $scope.bookId = angular.isDefined($routeParams.bookId) ? $routeParams.bookId : null;
  if ($scope.bookId !== null) {
    $scope.mode = 'view';
    BookService.getById($scope.bookId).then(function (response) {
      $scope.initialBook = response.data;
      $scope.book = angular.copy($scope.initialBook);
    });
  } else {
    $scope.mode = 'new';
    $scope.initialBook = {};
    $scope.book = angular.copy($scope.initialBook);
  }

  $scope.saveBook = function () {
    BookService.save($scope.book).then(function (response) {
      var dialog = new BootstrapDialog({
        message: function (dialogRef) {
          var $message = $('<div>OK, this dialog has no header and footer, but you can close the dialog using this button: </div>');
          var $button = $('<button class="btn btn-primary btn-lg btn-block">Close the dialog</button>');
          $button.on('click', { dialogRef: dialogRef }, function (event) {
            event.data.dialogRef.close();
          });
          $message.append($button);

          return $message;
        },
        closable: false
      });
      dialog.realize();
      dialog.getModalHeader().hide();
      dialog.getModalFooter().hide();
      dialog.getModalBody().css('background-color', '#0088cc');
      dialog.getModalBody().css('color', '#fff');
      dialog.open();

      setTimeout(function () {
        dialog.close();
        $scope.$apply(function () {
          $location.path('books');
      });
      }, 1000);
    });
  }

  $scope.edit = function() {
    $scope.mode = 'edit';
  };

  $scope.cancel = function() {
    $location.path('books');
  };

  $scope.reset = function() {
    $scope.book = angular.copy($scope.initialBook);
  };

};

BookDetailsController.$inject = ['$scope', '$http', 'BookService', '$routeParams','$location'];

app.controller('BookDetailsController', BookDetailsController);

