angular
  .module("timerApp", [])
  .directive("myCounter", function () {
    return {
      templateUrl: "counter.html",
      controller: "TimerController"
    }
  })
  .controller("TimerController", ["$scope", function ($scope) {
    var intervalHandler = null;
    var stopColor = '#ffa600';
    var runColor = '#00de64';

    $scope.totalMilliseconds = 0;
    $scope.color = stopColor;

    $scope.start = function () {
      if (intervalHandler == null) {
        intervalHandler = setInterval(function () {
          $scope.totalMilliseconds += 1000;
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
      $scope.totalMilliseconds = 0;
    }
  }]);