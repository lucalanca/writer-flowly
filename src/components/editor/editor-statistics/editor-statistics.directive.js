'use strict';

class EditorStatisticsCtrl {
  constructor ($scope) {
    var me = this;
    $scope.$watch(function () {
      return $scope.statistics.lines;
    }, function (newLines) {
      me.countWords(newLines);
    }, true);
  }

  countWords (lines) {
    if (!lines) {
      return;
    }

    this.wordsCount = lines.map((line) => {
      return line.content.replace('#', '');
    }).join(' ').split(' ').length;
    this.minutesToRead = parseInt(this.wordsCount / 200, 10) + 1;
  }
}

EditorStatisticsCtrl.$inject = ['$scope'];

function EditorStatistics () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'components/editor/editor-statistics/editor-statistics.html',
    controller: EditorStatisticsCtrl,
    controllerAs: 'statistics',
    bindToController: true,
    scope: {
      lines: '='
    }
  };
}

export default EditorStatistics;

