/**
 * Example in BDD test syntax https://nightwatchjs.org/guide/writing-tests/test-syntax-bdd.html with alternative:
 *
 * - context() - same as describe()
 * - before/after and beforeEach/afterEach hooks
 * - it() / test() / specify()
 */

const { ZebrunnerReporterAPI } = require("../../../../javascript-agent-nightwatch/lib/nightwatch/realTimeReporter");
//const { ZebrunnerReporterAPI } = require("@zebrunner/javascript-agent-nightwatch/lib/nightwatch/realTimeReporter");

context("Ecosia search", function () {

  beforeEach((browser) => {
    console.log("---TEST BEFORE_EACH---");
    ZebrunnerReporterAPI.startTest(browser);
  });

  afterEach((browser) => {
    console.log("---TEST AFTER_EACH---");
    ZebrunnerReporterAPI.finishTest(browser);
  });

  it("Search for Zebrunner at Ecosia", function (browser) {
    performSearchAndVerifyResult(browser, "zebrunner");
  });

  test("Search for Nightwatch at Ecosia", function (browser) {
    performSearchAndVerifyResult(browser, "nightwatch");
  });

  specify("Search for Selenium at Ecosia", function (browser) {
    performSearchAndVerifyResult(browser, "selenium");
  });

  function performSearchAndVerifyResult(browser, searchValue) {
    browser
      .navigateTo("https://www.ecosia.org/")
      .waitForElementVisible("body")
      .assert.titleContains("Ecosia")
      .assert.visible("input[type=search]")
      .setValue("input[type=search]", searchValue)
      .assert.visible("button[type=submit]")
      .click("button[type=submit]")
      .assert.textContains(".layout__content", searchValue).quit();
  }
});
