const {
  Before,
  After,
  AfterAll,
  BeforeAll,
  setDefaultTimeout,
} = require("@cucumber/cucumber");

setDefaultTimeout(30000);

Before(async function (testCase) {
  console.log("Inside Cucumber Before hook");

  if (!this.client) {
    console.error("Nightwatch instance was not created.");

    return;
  }
  this.browser = await this.client.launchBrowser();
});

After(() => {
  console.log("Inside Cucumber After hook");
});

BeforeAll(() => {
  console.log("Inside Cucumber BeforeAll hook");
});

AfterAll(() => {
  console.log("Inside Cucumber AfterAll hook");
});
