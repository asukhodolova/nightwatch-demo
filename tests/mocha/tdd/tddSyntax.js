/**
 * Example to run using Mocha https://nightwatchjs.org/guide/writing-tests/using-mocha.html in TDD style
 */
suite("DuckDuckGo search", function () {

  setup((browser) => {
    browser.navigateTo("https://duckduckgo.com");
  });

  test("Search Zebrunner and check results", function (browser) {
    performSearchAndVerifyResult(browser, "Zebrunner");
  });

  test("Search Nightwatch.js and check results", function (browser) {
    performSearchAndVerifyResult(browser, "Nightwatch.js");
  });

  test("Search Selenium and check results", function (browser) {
    performSearchAndVerifyResult(browser, "Selenium");
  });

  function performSearchAndVerifyResult(browser, searchValue) {
    browser
      .waitForElementVisible("input[name=q]")
      .sendKeys("input[name=q]", [searchValue])
      .click('*[type="submit"]')
      .assert.visible(".results--main")
      .assert.textContains(".results--main", searchValue);
  }
});
