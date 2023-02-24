/**
 * Example in 'exports' test syntax https://nightwatchjs.org/guide/writing-tests/test-syntax-exports.html
 */

//const { ZebrunnerReporterAPI } = require("../../../../javascript-agent-nightwatch/lib/index");
const { ZebrunnerReporterAPI } = require("@zebrunner/javascript-agent-nightwatch/lib/index");

module.exports = {

  beforeEach: function (browser) {
    console.log("---TEST BEFORE_EACH---");
    ZebrunnerReporterAPI.startTest(browser);
  },

  afterEach: function (browser) {
    console.log("---TEST AFTER_EACH---");
    ZebrunnerReporterAPI.finishTest(browser);
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

  "failed step 3: add one more todo element": async function (browser) {
    await browser
      .sendKeys("#new-todo-input", "new todo element")
      .click('form button[type="submit"]')
      .assert.elementHasCount("#todo-list ul li", 5); // should fail here
  },

  "skipped step 4: remove todo element": async function (browser) {
    await browser
      .click(".btn__danger")
      .assert.elementHasCount("#todo-list ul li", 4).end();
  },
};
