const fs = require("fs");

module.exports = {
  // Custom reporter
  // reporter: (results, done) => {
  //   fs.writeFile("custom_report.json", JSON.stringify(results, null, "\t"),
  //     (err) => {
  //       if (err) throw err;

  //       console.log("Custom report is saved");
  //       done();
  //     }
  //   );
  // },

  // External before hook is ran at the beginning of the tests run, before creating the Selenium session
  before(done) {
    console.log("---GLOBAL before---");
    done();
  },

  // External after hook is ran at the very end of the tests run, after closing the Selenium session
  after(done) {
    console.log("---GLOBAL after---");
    done();
  },

  // This will be run before each test suite is started
  beforeEach(browser, done) {
    console.log("---GLOBAL beforeEach---");
    done();
  },

  // This will be run after each test suite is finished
  afterEach(browser, done) {
    console.log("---GLOBAL afterEach---");
    done();
  },

  // Called right after the command .navigateTo() is finished
  async onBrowserNavigate(browser) {
    return Promise.resolve();
  },

  // Called right before the command .quit() is finished
  async onBrowserQuit(browser) {
    return Promise.resolve();
  },
};
