describe('Timer App', function() {
  // beforeEach(function (done) {
  // });

  it('should have a title', function() {
    browser.get('counter.html');
    expect(browser.getTitle()).toEqual('Angular Timer');
  });

  it('should be able to start, stop and reset', function () {
    browser.get('counter.html');
    var numberElement = element(by.css('.numbers'));
    expect(numberElement.getText()).toEqual("00:00");
    element(by.buttonText("Start")).click();
    expect(numberElement.getText()).toEqual("00:00");
    browser.wait(browser.sleep(2001));
    element(by.buttonText("Stop")).click();
    expect(numberElement.getText()).toEqual("00:02");
    browser.wait(browser.sleep(2001));
    expect(numberElement.getText()).toEqual("00:02");
    element(by.buttonText("Reset")).click();
    expect(numberElement.getText()).toEqual("00:00");
  });

  it('should change background color at start or stop', function () {
    var body = element(by.tagName('body'));
    var initColor, stopColor, startColor;
    browser.get('counter.html');
    body.getCssValue('background-color').then(
      function(value){ initColor = value;}
    );
    element(by.buttonText("Start")).click();
    // wait completion of transition animation
    browser.wait(browser.sleep(999));

    body.getCssValue('background-color').then(
      function(value){ startColor = value;}
    );
    element(by.buttonText("Stop")).click();
    // wait completion of transition animation
    browser.wait(browser.sleep(999));
    
    body.getCssValue('background-color').then(
      function(value){
        stopColor = value;
        expect(startColor).not.toEqual(stopColor);
        expect(initColor).toEqual(stopColor);
      }
    );

  });
});