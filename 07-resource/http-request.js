angular
  .module("restApp", ["ngResource"])
  .config(["$httpProvider", function ($httpProvider) {
    $httpProvider.defaults.headers.common['X-KSD-API-TOKEN'] = "alwayswin"
  }])
  .service("GatewayService", ["$resource", function ($resource) {
    var gatewayResource = $resource(
      'http://127.0.0.1:1323/gateways/:gatewayEui',    // url
      {},     // paramDefaults
      {
        "list": {method: "GET"}
      }     // actions
    );
    return gatewayResource;
  }])
  .controller("HttpController", ["$scope", "GatewayService", function ($scope, gatewayService) {
    $scope.running = false;
    $scope.gateways = null

    function preRequest() {
      $scope.serverData = $scope.errorMsg = null;
      $scope.running = true;
    }

    function parseResponse(response) {
      $scope.running = false;
      $scope.serverData = JSON.stringify(response, null, 2).trim();
    }

    function recordError(response) {
      $scope.running = false;
      $scope.errorMsg = JSON.stringify(response, null, 2).trim();
    }

    $scope.list = function () {
      preRequest();
      // FIXME why not using "query" but adding a custom action "list"? -- $resource requires array in query
      $scope.gateways = gatewayService.list(null, parseResponse, recordError);
    }

    $scope.create = function () {
      var gateway = {
        "gatewayEui": "angular gateway",
        "location": {
          "drift": 0,
          "latitude": "",
          "longitude": "",
          "updated": 0
        }
      };
      preRequest();
      gatewayService.save(gateway, parseResponse, recordError);
    }

    // FIXME how to add an updating action?
	}]);
