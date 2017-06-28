angular
  .module("helloApp", [])
	.controller("HelloController", ["$scope", function ($scope) {
    $scope.name = "Controller"
    $scope.level = "parent"
    $scope.sayMorning = function (name) {
      alert("Morning, " + name)
    }
	}])

