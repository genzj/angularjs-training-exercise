angular
  .module("restApp", [])
  .controller("HttpController", ["$scope", "$http", function ($scope, $http) {
    $scope.running = false;

    $scope.request = function () {
      $scope.serverData = $scope.errorMsg = null;
      $scope.running = true;
      $http({
        method: 'GET',
        url: 'http://127.0.0.1:1323/gateways',
        headers: {
          'X-KSD-API-TOKEN': 'alwayswin',
        },
      }).then(
        function (response) {
          $scope.running = false;
          $scope.serverData = JSON.stringify(response.data, null, 2).trim();
        },
        function (response) {
          $scope.running = false;
          $scope.errorMsg = JSON.stringify(response, null, 2).trim();
        }
      )
    }
	}])
