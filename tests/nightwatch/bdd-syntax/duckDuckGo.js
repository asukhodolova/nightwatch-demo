/**
 * Example in BDD test syntax https://nightwatchjs.org/guide/writing-tests/test-syntax-bdd.html
 * with failed/skipped tests and:
 *
 * - skipTestcasesOnFail = true that means skipping the remaining testcases when one testcase fails
 * - retries - how many time to retry a failed testcase inside this test suite
 * - suiteRetries - how many times to retry the current test suite in case of an assertion failure or error
 */

const fs = require('fs');
//const { ZebrunnerReporterAPI, CurrentTestRun, CurrentTest, TestRail, Xray, Zephyr, Zebrunner, } = require("../../../../javascript-agent-nightwatch");
const { ZebrunnerReporterAPI, CurrentTestRun, CurrentTest, TestRail, Xray, Zephyr, Zebrunner, } = require("@zebrunner/javascript-agent-nightwatch");


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
    TestRail.testCaseId(browser, '3435', 'C3438');
    TestRail.testCaseStatus(browser, '3435', 'failed');
    Xray.testCaseKey(browser, 'QT-2');
    Zephyr.testCaseKey(browser, 'QT-T1');
    Zebrunner.testCaseKey(browser, 'ANNAS-1', 'ANNAS-4');

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
    TestRail.testCaseId(browser, '3436', '3477');
    Xray.testCaseKey(browser, 'QT-10', 'QT-11');
    Zephyr.testCaseKey(browser, 'QT-T2');
    Zebrunner.testCaseKey(browser, 'ANNAS-2');

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
    TestRail.testCaseId(browser, '3478');
    Xray.testCaseKey(browser, 'QT-18');
    Zephyr.testCaseKey(browser, 'QT-T3');
    Zebrunner.testCaseKey(browser, 'ANNAS-3');
    
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
