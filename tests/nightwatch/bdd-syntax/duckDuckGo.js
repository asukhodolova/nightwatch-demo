/**
 * Example in BDD test syntax https://nightwatchjs.org/guide/writing-tests/test-syntax-bdd.html
 * with failed/skipped tests and:
 *
 * - skipTestcasesOnFail = true that means skipping the remaining testcases when one testcase fails
 * - retries - how many time to retry a failed testcase inside this test suite
 * - suiteRetries - how many times to retry the current test suite in case of an assertion failure or error
 */

const fs = require('fs');
//const { ZebrunnerReporterAPI } = require("../../../../javascript-agent-nightwatch");
const { ZebrunnerReporterAPI, CurrentTestRun, CurrentTest } = require("@zebrunner/javascript-agent-nightwatch");


describe("DuckDuckGo search", function () {
  // skip remaining testcases when one testcase fails
  this.skipTestcasesOnFail = true;

  // how many time to retry a failed testcase inside this test suite
  // this.retries(2);

  // how many times to retry the current test suite in case of an assertion failure or error
  // this.suiteRetries(2);


  beforeEach((browser) => {
    console.log('---TEST BEFORE_EACH---');

    CurrentTestRun.attachLabel('run_label', 'first', 'second');
    CurrentTestRun.attachArtifactReference('documentation', 'https://zebrunner.com/documentation/');
    CurrentTestRun.uploadArtifactFromFile("configuration", "./lib/globals.js");

    const buffer = fs.readFileSync("./settings.json")
    CurrentTestRun.uploadArtifactBuffer('artifact_json', 'application/json', buffer);

    ZebrunnerReporterAPI.startTest(browser);

    CurrentTest.attachLabel(browser, 'test_label', 'before_1', 'before_2');
    CurrentTest.attachArtifactReference(browser, 'github', 'https://github.com/zebrunner');
    CurrentTest.uploadArtifactFromFile(browser, "readme", "./README.md");
    CurrentTest.setMaintainer(browser, 'asukhodolova');

    browser.navigateTo("https://duckduckgo.com")
  });

  afterEach(async (browser) => {
    await browser.end();

    console.log('---TEST AFTER_EACH---');
    ZebrunnerReporterAPI.finishTest(browser);
  });

  it("[PASS] Search Nightwatch.js and check results", function (browser) {
    CurrentTest.attachLabel(browser, 'test', 'pass');
    CurrentTest.attachLabel(browser, 'owner', 'developer');

    const searchValue = 'Nightwatch.js';
    browser
      .waitForElementVisible("input[name=q]")
      .sendKeys("input[name=q]", searchValue)
      .click('*[type="submit"]')
      .assert.visible(".results--main")
      .assert.textContains(".results--main", searchValue);
  });

  it("[FAIL] Search Zebrunner and check results", function (browser) {
    CurrentTest.attachArtifactReference(browser, 'nightwatch', 'https://nightwatchjs.org/');

    const searchValue = 'Zebrunner';
    browser
      .waitForElementVisible("input[name=q]")
      .sendKeys("input[name=q]", searchValue)
      .click('*[type="submit"]')
      .assert.visible(".results--main")
      .assert.textEquals(".results--main", searchValue).end();
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
