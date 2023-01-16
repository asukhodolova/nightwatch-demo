/**
 * Example in 'exports' test syntax https://nightwatchjs.org/guide/writing-tests/test-syntax-exports.html
 */
const AgentReporter = require("../../../zebrunner-agent/agentReporter");
AgentReporter.init();

module.exports = {
  beforeEach: function (browser) {
    AgentReporter.startTestExecution(browser.currentTest);
  },

  afterEach: function (browser) {
    AgentReporter.finishTestExecution(browser.currentTest);
  },

  after: function (browser, done) {
    browser.end(() => {
      AgentReporter.terminate();
      done();
    });
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
