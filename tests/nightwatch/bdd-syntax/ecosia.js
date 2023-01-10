/**
 * Example in BDD test syntax https://nightwatchjs.org/guide/writing-tests/test-syntax-bdd.html with alternative:
 *
 * - context() - same as describe()
 * - before/after and beforeEach/afterEach hooks
 * - it() / test() / specify()
 */
context("Ecosia search", function () {
  
  before(() => {
    console.log("Test suite is started");
  });

  after((browser) => {
    console.log("Test suite is finished");
    browser.end();
  });

  beforeEach(() => {
    console.log("Test case is started");
    browser.navigateTo("https://www.ecosia.org/");
  });

  afterEach(() => {
    console.log("Test case is finished");
  });

  it("Demo ecosia.org 1 via it()", function (browser) {
    performSearchAndVerifyResult(browser);
  });

  test("Demo ecosia.org 1 via test()", function (browser) {
    performSearchAndVerifyResult(browser);
  });

  specify("Demo ecosia.org 1 via specify()", function (browser) {
    performSearchAndVerifyResult(browser);
  });

  function performSearchAndVerifyResult(browser) {
    browser
      .waitForElementVisible("body")
      .assert.titleContains("Ecosia")
      .assert.visible("input[type=search]")
      .setValue("input[type=search]", "nightwatch")
      .assert.visible("button[type=submit]")
      .click("button[type=submit]")
      .assert.textContains(".layout__content", "Nightwatch.js");
  }
});
