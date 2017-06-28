angular
  .module("timerApp", [])
  .controller("TimerController", ["$scope", function ($scope) {
    var intervalHandler = null;
    var stopColor = '#ffa600';
    var runColor = '#00de64';

    $scope.totalSeconds = 0;
    $scope.color = stopColor;

    $scope.start = function () {
      if (intervalHandler == null) {
        intervalHandler = setInterval(function () {
          $scope.totalSeconds += 1000;
          $scope.$apply()
        }, 1000);
        $scope.color = runColor;
      }
    };

    $scope.stop = function () {
      if (intervalHandler != null) {
        clearInterval(intervalHandler);
        intervalHandler = null;
        $scope.color = stopColor;
      }
    };

    $scope.reset = function () {
      $scope.totalSeconds = 0;
    }
  }]);