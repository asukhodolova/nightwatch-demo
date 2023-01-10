/**
 * Example to run using Mocha https://nightwatchjs.org/guide/writing-tests/using-mocha.html with:
 * - alternative aliases (context and specify)
 */
describe("DuckDuckGo search", function () {
  beforeEach(() => {
    browser.navigateTo("https://duckduckgo.com");
  });

  after((browser) => browser.end());

  context("Perform search and verify result", function () {
    specify("Search Zebrunner and check results", function (browser) {
      performSearchAndVerifyResult(browser, "Zebrunner");
    });

    specify("Search Nightwatch.js and check results", function (browser) {
      performSearchAndVerifyResult(browser, "Nightwatch.js");
    });

    specify("Search Selenium and check results", function (browser) {
      performSearchAndVerifyResult(browser, "Selenium");
    });
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
