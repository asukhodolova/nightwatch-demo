/**
 * Example in BDD test syntax https://nightwatchjs.org/guide/writing-tests/test-syntax-bdd.html
 * with failed/skipped tests and:
 *
 * - skipTestcasesOnFail = true that means skipping the remaining testcases when one testcase fails
 * - retries - how many time to retry a failed testcase inside this test suite
 * - suiteRetries - how many times to retry the current test suite in case of an assertion failure or error
 */

//const { ZebrunnerReporterAPI } = require("../../../../javascript-agent-nightwatch");
const { ZebrunnerReporterAPI } = require("@zebrunner/javascript-agent-nightwatch");

describe("DuckDuckGo search", function () {
  // skip remaining testcases when one testcase fails
  this.skipTestcasesOnFail = true;

  // how many time to retry a failed testcase inside this test suite
  // this.retries(2);

  // how many times to retry the current test suite in case of an assertion failure or error
  // this.suiteRetries(2);


  beforeEach((browser) => {
    console.log('---TEST BEFORE_EACH---');
    ZebrunnerReporterAPI.startTest(browser);

    browser.navigateTo("https://duckduckgo.com")
  });

  afterEach(async (browser) => {
    await browser.end();

    console.log('---TEST AFTER_EACH---');
    ZebrunnerReporterAPI.finishTest(browser);
  });

  it("[PASS] Search Nightwatch.js and check results", function (browser) {
    const searchValue = 'Nightwatch.js';
    browser
      .waitForElementVisible("input[name=q]")
      .sendKeys("input[name=q]", searchValue)
      .click('*[type="submit"]')
      .assert.visible(".results--main")
      .assert.textContains(".results--main", searchValue);
  });

  it("[FAIL] Search Zebrunner and check results", function (browser) {
    const searchValue = 'Zebrunner';
    browser
      .waitForElementVisible("input[name=q]")
      .sendKeys("input[name=q]", searchValue)
      .click('*[type="submit"]')
      .assert.visible(".results--main")
      .assert.textEquals(".results--main",searchValue).end();
  });

  it("[SKIP] Search Selenium and check results", function (browser) {
    const searchValue = 'Selenium';
    browser
      .refresh()
      .waitForElementVisible("input[name=q]")
      .clearValue("input[name=q]")
      .sendKeys("input[name=q]", searchValue)
      .click('*[type="submit"]')
      .assert.visible(".results--main")
      .assert.textContains(".results--main", searchValue);
  });
});
