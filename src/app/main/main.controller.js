'use strict';

class MainCtrl {
  constructor ($scope) {
    $scope.lines = [];

    $scope.previewAvailable = false;
    $scope.preview = () => {
      $scope.previewContent = $scope.lines.map( (line) => line.content ).join('\n');
      $scope.previewAvailable = true;
    };

  }
}

MainCtrl.$inject = ['$scope'];

export default MainCtrl;
