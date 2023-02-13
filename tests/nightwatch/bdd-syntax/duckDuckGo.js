/**
 * Example in BDD test syntax https://nightwatchjs.org/guide/writing-tests/test-syntax-bdd.html
 * with failed/skipped tests and:
 *
 * - skipTestcasesOnFail = true that means skipping the remaining testcases when one testcase fails
 * - retries - how many time to retry a failed testcase inside this test suite
 * - suiteRetries - how many times to retry the current test suite in case of an assertion failure or error
 */

const {
  ReporterAPI,
} = require("../../../../javascript-agent-nightwatch/lib/nightwatch/realTimeReporter");
ReporterAPI.init();
describe("DuckDuckGo search", function () {
  // skip remaining testcases when one testcase fails
  this.skipTestcasesOnFail = true;

  // how many time to retry a failed testcase inside this test suite
  // this.retries(2);

  // how many times to retry the current test suite in case of an assertion failure or error
  // this.suiteRetries(2);

  const SEARCH_VALUE = "Nightwatch.js";

  before((browser) => browser.navigateTo("https://duckduckgo.com"));

  beforeEach((browser) => {
    console.log("BEFORE EACH FROM TEST");

    ReporterAPI.startTest(browser.currentTest);
  });

  afterEach((browser) => {
    console.log("AFTER EACH FROM TEST");

    ReporterAPI.finishTest(browser.currentTest);
  });

  after((browser, done) => {
    console.log("AFTER FROM TEST");

    browser.end(() => {
      ReporterAPI.destroy();
      done();
    });
  });

  it("[FAIL] Search Nightwatch.js and check results", function (browser) {
    browser
      .waitForElementVisible("input[name=q]")
      .sendKeys("input[name=q]", [SEARCH_VALUE])
      .click('*[type="submit"]')
      .assert.visible(".results--main")
      .assert.textEquals(".results--main", SEARCH_VALUE); // should fail here
  });

  it("[SKIP] Search Nightwatch.js and check results", function (browser) {
    browser
      .refresh()
      .waitForElementVisible("input[name=q]")
      .clearValue("input[name=q]")
      .sendKeys("input[name=q]", [SEARCH_VALUE])
      .click('*[type="submit"]')
      .assert.visible(".results--main")
      .assert.textContains(".results--main", SEARCH_VALUE);
  });
});
