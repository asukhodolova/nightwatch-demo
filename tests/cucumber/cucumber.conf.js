const {
  Before,
  After,
  AfterAll,
  BeforeAll,
  setDefaultTimeout,
} = require("@cucumber/cucumber");

setDefaultTimeout(30000);

Before(async function (testCase) {
  console.log("---Cucumber Before hook---");

  if (!this.client) {
    console.error("Nightwatch instance was not created.");

    return;
  }
  this.browser = await this.client.launchBrowser();
});

After(() => {
  console.log("---Cucumber After hook---");
});

BeforeAll(() => {
  console.log("---Cucumber BeforeAll hook---");
});

AfterAll(() => {
  console.log("---Cucumber AfterAll hook---");
});
