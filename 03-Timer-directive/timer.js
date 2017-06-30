angular
  .module("timerApp", [])
  .directive("myCounter", function () {
    return {
      require: ['myCounter',],
      templateUrl: "counter.html",
      controller: "TimerController",
      scope: {
        "initialMs": "=",
      },
      link: function(scope, element, attrs, controllers) {
        var myCtrl = controllers[0];
        myCtrl.setTo(scope.initialMs || 0);
      }
    }
  })
  .controller("TimerController", ["$scope", "$element", function ($scope, $element) {
    var intervalHandler = null;
    var stopColor = '#ffa600';
    var runColor = '#00de64';

    this.setTo = function (ms) {
      $scope.totalMilliseconds = ms;
    };

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