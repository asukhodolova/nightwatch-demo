/**
 * Example to run using Mocha https://nightwatchjs.org/guide/writing-tests/using-mocha.html:
 *
 * - before/after and beforeEach/afterEach hooks
 * - skipTestcasesOnFail = false that means test cases will continue running on fail
 *
 * 1. with expect assertions:
 * - [EXPECT] should find Zebrunner in results SUCCESS;
 * - [EXPECT] should see all menu items FAIL;
 * 2. with assert assertions:
 * - [ASSERT] should open the first result SUCCESS;
 * - [ASSERT] should open the first result FAIL;
 * 3. fail with NoSuchElementError:
 * - [NoSuchElementError] should open the first result FAIL with NoSuchElementError
 * 4. with verify assertions (when an assertion fails, the test logs the failure and continues with other):
 * - [VERIFY] should see query value in url SUCCESS;
 * - [VERIFY] should see all menu items FAIL;
 */
describe("Google search", function () {
  this.skipTestcasesOnFail = false;

  const SEARCH_VALUE = "Zebrunner";

  let homePage;

  before(function (browser, done) {
    console.log("Test suite is started");
    homePage = browser.page.google.search();
    done();
  });

  after(function (browser, done) {
    console.log("Test suite is finished");
    browser.end(function () {
      done();
    });
  });

  beforeEach(() => {
    console.log("Test case is started");
    console.log("Perform a search with value=" + SEARCH_VALUE);
    homePage.navigate();
    homePage.setValue("@searchBar", SEARCH_VALUE);
    homePage.submit();
  });

  afterEach(() => {
    console.log("Test case is finished");
  });

  it("[EXPECT] should find Zebrunner in results SUCCESS", function (browser) {
    const resultsPage = browser.page.google.searchResults();
    resultsPage.expect.element("@results").to.be.present;
    resultsPage.expect.element("@results").text.to.contain(SEARCH_VALUE);
  });

  it("[EXPECT] should find Zebrunner in results FAIL", function (browser) {
    const resultsPage = browser.page.google.searchResults();
    resultsPage.expect.element("@results").to.be.present;
    resultsPage.expect.element("@results").text.to.not.contain(SEARCH_VALUE); // should fail here
  });

  it("[ASSERT] should open the first result SUCCESS", function (browser) {
    const resultsPage = browser.page.google.searchResults();
    resultsPage.expect.element("@firstResult").to.be.present;

    resultsPage.openFirstResult();
    browser.assert.urlEquals("https://zebrunner.com/");
    browser.assert.titleEquals("Test automation management | Zebrunner");
  });

  it("[ASSERT] should open the first result FAIL", function (browser) {
    const resultsPage = browser.page.google.searchResults();
    resultsPage.expect.element("@firstResult").to.be.present;

    resultsPage.openFirstResult();
    browser.assert.urlEquals("https://google.com/"); // should fail here
  });

  it("[NoSuchElementError] should open the first result FAIL", function (browser) {
    const resultsPage = browser.page.google.searchResults();
    resultsPage.expect.element("@firstResult").to.be.present;

    resultsPage.openFirstResult();
    browser.waitForElementPresent("#register").click("#register"); // should fail here
    browser.assert.urlEquals("/register");
  });

  it("[VERIFY] should see query value in url SUCCESS", function (browser) {
    const resultsPage = browser.page.google.searchResults();
    resultsPage.verify.urlContains("search?q=" + SEARCH_VALUE);
    resultsPage.verify.titleContains(SEARCH_VALUE);
  });

  it("[VERIFY] should see all menu items FAIL", function (browser) {
    const resultsPage = browser.page.google.searchResults();
    resultsPage.verify.elementHasCount("#hdtb .hdtb-mitem", 3); // should fail here
    resultsPage.verify.section("@menu").to.be.visible;

    const menuSection = resultsPage.section.menu;
    menuSection.expect.element("@all").to.be.visible;
  });
});
