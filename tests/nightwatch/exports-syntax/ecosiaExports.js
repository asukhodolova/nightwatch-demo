/**
 * Example in 'exports' test syntax https://nightwatchjs.org/guide/writing-tests/test-syntax-exports.html
 */

//const { ZebrunnerReporterAPI } = require("../../../../javascript-agent-nightwatch/lib/index");
const { ZebrunnerReporterAPI } = require("@zebrunner/javascript-agent-nightwatch/lib/index");

module.exports = {

  // before: function(browser) {
  //   assert.equal([1, 2, 3].indexOf(4), -1);
  // },

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
      .assert.textContains(".layout__content", "Nightwatch.js");
  },
};
