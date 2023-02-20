/**
 * Example in 'exports' test syntax https://nightwatchjs.org/guide/writing-tests/test-syntax-exports.html
 */

const { ZebrunnerReporterAPI } = require("../../../../javascript-agent-nightwatch/lib/nightwatch/realTimeReporter");
//const { ZebrunnerReporterAPI } = require("@zebrunner/javascript-agent-nightwatch/lib/nightwatch/realTimeReporter");

module.exports = {

  beforeEach: function (browser) {
    console.log("---TEST BEFORE_EACH---");
    ZebrunnerReporterAPI.startTest(browser);
  },

  afterEach: function (browser) {
    console.log("---TEST AFTER_EACH---");
    ZebrunnerReporterAPI.finishTest(browser);
  },

  after: function (browser) {
    browser.end();
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
      .assert.containsText(".layout__content", "Nightwatch.js");
  },
};
