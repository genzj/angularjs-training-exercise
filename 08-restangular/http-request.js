angular
  .module("restApp", ["restangular"])
  .controller("HttpController", ["$scope", "Restangular", function ($scope, Restangular) {
    var r = Restangular.withConfig(function (configurer){
      configurer.setBaseUrl("http://127.0.0.1:1323/");
      configurer.setDefaultHeaders({'X-KSD-API-TOKEN': "alwayswin"});
      configurer.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
        var extractedData;
        // .. to look for getList operations
        if (operation === "getList") {
          // .. and handle the data and meta data
          extractedData = data.data;
          extractedData.meta = {
            "offset": data.offset,
            "limit": data.limit,
            "total": data.total,
            "more": data.more,
          };
        } else {
          extractedData = data;
        }
        return extractedData;
      });
    });
    $scope.running = false;

    function preRequest() {
      $scope.serverData = $scope.metaData = $scope.errorMsg = null;
      $scope.running = true;
    }

    function parseResponse(response) {
      $scope.running = false;
      $scope.serverData = JSON.stringify(response, null, 2).trim();
      if (response.meta) {
        $scope.metaData = JSON.stringify(response.meta, null, 2).trim();
      }
    }

    function recordError(response) {
      $scope.running = false;
      $scope.errorMsg = JSON.stringify(response, null, 2).trim();
    }

    $scope.list = function () {
      preRequest();
      r.all('gateways').getList().then(parseResponse).catch(recordError);
    };

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
      r.all('gateways').post(gateway).then(parseResponse).catch(recordError);
    };
	}]);
