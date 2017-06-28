angular
  .module("orderApp", [])
  .constant("STATIC_DEMO_SERVICES",[
    {
      name: 'Web Development',
      price: 300,
      active:false
    },{
      name: 'Design',
      price: 400,
      active:false
    },{
      name: 'Integration',
      price: 250,
      active:false
    },{
      name: 'Training',
      price: 220,
      active:false
    }
  ])
  .filter("rmb", ['$filter', function ($filter) {
    return function rmbFilter(value) {
      return $filter('currency')(value, '￥')
    };
  }])
  .factory("OrderMenuService", ["STATIC_DEMO_SERVICES", function(demoServices) {
    var services = demoServices;
    return {
      getAvailableServices: function () {
        return services;
      },

      // Helper method for calculating the total price
      total: function(){

        var total = 0;

        // Use the angular forEach helper method to
        // loop through the services array:

        angular.forEach(services, function(s){
          if (s.active){
            total+= s.price;
          }
        });

        return total;
      },

    }
  }])
  .controller("OrderFormController", ["$scope", "OrderMenuService", function ($scope, menu) {
  {

    // Define the model properties. The view will loop
    // through the services array and genreate a li
    // element for every one of its items.
    $scope.services = menu.getAvailableServices();

    $scope.toggleActive = function(s){
      s.active = !s.active;
    };

    $scope.total = menu.total;
  }

}]);