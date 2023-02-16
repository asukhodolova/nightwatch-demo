/**
 * Example in BDD test syntax https://nightwatchjs.org/guide/writing-tests/test-syntax-bdd.html with alternative:
 *
 * - context() - same as describe()
 * - before/after and beforeEach/afterEach hooks
 * - it() / test() / specify()
 */

//const { ReporterAPI} = require("../../../../javascript-agent-nightwatch/lib/nightwatch/realTimeReporter");
const { ReporterAPI } = require("@zebrunner/javascript-agent-nightwatch/lib/nightwatch/realTimeReporter");

context("Ecosia search", function () {
  beforeEach((browser) => {
    console.log("---TEST BEFORE_EACH---");
    ReporterAPI.startTest(browser.currentTest);
  });

  afterEach((browser) => {
    console.log("---TEST AFTER_EACH---");
    ReporterAPI.finishTest(browser.currentTest);
  });

  it("Demo ecosia.org 1 via it()", function (browser) {
    performSearchAndVerifyResult(browser);
  });

  test("Demo ecosia.org 1 via test()", function (browser) {
    performSearchAndVerifyResult(browser);
  });

  specify("Demo ecosia.org 1 via specify()", function (browser) {
    performSearchAndVerifyResult(browser);
  });

  function performSearchAndVerifyResult(browser) {
    // browser
    //   .navigateTo("https://www.ecosia.org/")
    //   .waitForElementVisible("body")
    //   .assert.titleContains("Ecosia")
    //   .assert.visible("input[type=search]")
    //   .setValue("input[type=search]", "nightwatch")
    //   .assert.visible("button[type=submit]")
    //   .click("button[type=submit]")
    //   .assert.textContains(".layout__content", "Nightwatch.js");
  }
});
