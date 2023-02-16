/**
 * Example in 'exports' test syntax https://nightwatchjs.org/guide/writing-tests/test-syntax-exports.html
 */

const { ReporterAPI} = require("../../../../javascript-agent-nightwatch/lib/nightwatch/realTimeReporter");
//const { ReporterAPI } = require("@zebrunner/javascript-agent-nightwatch/lib/nightwatch/realTimeReporter");

module.exports = {
  beforeEach: function (browser) {
    console.log("---TEST BEFORE_EACH---");
    ReporterAPI.startTest(browser.currentTest);
  },

  afterEach: function (browser) {
    console.log("---TEST AFTER_EACH---");
    ReporterAPI.finishTest(browser.currentTest);
  },

  "step one: navigate to ecosia.org": function (browser) {
    browser
      .url("https://www.ecosia.org")
      .waitForElementVisible("body")
      .assert.titleContains("Ecosia")
      .assert.visible("input[type=search]")
      .setValue("input[type=search]", "nightwatch")
      .assert.visible("button[type=submit]");
  },

  "step two: click submit": function (browser) {
    browser
      .click("button[type=submit]")
      .assert.containsText(".layout__content", "Nightwatch.js")
      .end();
  },
};