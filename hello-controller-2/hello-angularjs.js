angular
  .module("helloApp", [])
  .constant("GreetingWord", "Morning, ")
  .factory("GreetingService2", ["GreetingWord", function (greetingWord) {
    return {
      greeting: function (name) {
        alert(greetingWord + name)
      }
    }
  }])
  .service("GreetingService", ["GreetingWord", function (greetingWord) {
    this.greeting = function (name) {
      alert(greetingWord + name)
    }
  }])
	.controller("HelloController", ["$scope", "GreetingService", function ($scope, greetingService) {
    $scope.name = "Controller"
    $scope.level = "parent"
    $scope.sayMorning = greetingService.greeting
	}])

  .controller("ChildController", ["$scope", function ($scope) {
    $scope.level = "child"
    $scope.age = "30"
  }])
