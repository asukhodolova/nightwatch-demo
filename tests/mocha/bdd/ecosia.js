/**
 * Example to run using Mocha https://nightwatchjs.org/guide/writing-tests/using-mocha.html
 */

describe("Ecosia", function () {

  beforeEach(async (browser) => {
    browser.navigateTo("https://www.ecosia.org/");
  });

  it("should search for Nightwatch successfully", function (browser) {
    browser
      .waitForElementVisible("body")
      .assert.titleContains("Ecosia")
      .assert.visible("input[type=search]")
      .setValue("input[type=search]", "nightwatch")
      .assert.visible("button[type=submit]")
      .click("button[type=submit]")
      .assert.textContains(".layout__content", "Nightwatch.js");
  });

  it("should fail when page is opened", function (browser) {
    browser.waitForElementVisible("body").assert.titleContains("Google");
  });

  it.skip("should skip", function (browser) { });

  it("should pass as empty test", function (browser) { });

  it("should fail with an Error", function (browser) {
    throw new TypeError("This is an error", "someFile.js", 10);
  });
});
