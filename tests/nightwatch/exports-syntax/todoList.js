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

  "step 1: navigate to todo site": async function (browser) {
    await browser
      .navigateTo("https://todo-vue3-vite.netlify.app/")
      .assert.elementHasCount("#todo-list ul li", 4);
  },

  "step 2: add a new todo element": async function (browser) {
    await browser
      .sendKeys("#new-todo-input", "what is nightwatch?")
      .click('form button[type="submit"]')
      .assert.elementHasCount("#todo-list ul li", 5);
  },

  "step 3: add one more todo element": async function (browser) {
    await browser
      .sendKeys("#new-todo-input", "new todo element")
      .click('form button[type="submit"]')
      .assert.elementHasCount("#todo-list ul li", 6);
  },

  "failed step 4: remove todo element": async function (browser) {
    await browser
      .click(".btn__danger")
      .assert.elementHasCount("#todo-list ul li", 4) // should fail here
      .end();
  },
};
