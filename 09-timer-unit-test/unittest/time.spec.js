describe('TimerController', function() {
  beforeEach(module('timerApp'));

  var $controller;
  var $scope;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  beforeEach(inject(function ($rootScope) {
    $scope = $rootScope.$new();
    var controller = $controller('TimerController', { $scope: $scope });
  }));

  beforeAll(function () {
    jasmine.clock().install();
  });

  afterAll(function () {
    jasmine.clock().uninstall();
  });


  describe("start and stop", function () {
    var intervalHandler;

    beforeEach(function () {
      var globalSetInterval = window.setInterval;
      spyOn(window, "setInterval").and.callFake(function() {
        intervalHandler = globalSetInterval.apply(window, arguments);
        return intervalHandler;
      });
      spyOn(window, "clearInterval").and.callThrough();
    });

    afterEach(function(){
      if (intervalHandler) {
        clearInterval(intervalHandler);
        // console.log("interval " + intervalHandler + " cleared.");
        intervalHandler = null;
      }
    });

    it('start calls setInterval with 1000ms interval', function() {
      $scope.start();
      expect(window.setInterval).toHaveBeenCalled();
      expect(window.setInterval).toHaveBeenCalledTimes(1);
      expect(window.setInterval.calls.argsFor(0)[1]).toEqual(1000);
    });

    it('stop clears the corresponding interval', function() {
      $scope.start();
      $scope.stop();
      expect(window.clearInterval).toHaveBeenCalledWith(intervalHandler);
    });

    it('changes colors at starting and stopping', function () {
      var initColor = $scope.color;
      var runColor, stopColor;
      $scope.start();
      runColor = $scope.color;
      $scope.stop();
      stopColor = $scope.color;

      expect(initColor).toEqual(stopColor);
      expect(runColor).not.toEqual(initColor);
      expect(runColor).not.toEqual(stopColor);

    });
  });


  describe("time values", function () {

    it("updates total seconds every second", function () {
      $scope.start();
      expect($scope.totalMilliseconds).toEqual(0);
      jasmine.clock().tick(1001);
      expect($scope.totalMilliseconds).toEqual(1000);
    });

    it("back to zero by reset()", function () {
      $scope.start();
      expect($scope.totalMilliseconds).toEqual(0);
      jasmine.clock().tick(30001);
      expect($scope.totalMilliseconds).toEqual(30000);
      $scope.reset();
      expect($scope.totalMilliseconds).toEqual(0);
    });
  });



});