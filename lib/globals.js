module.exports = {
  // External before hook is ran at the beginning of the tests run, before creating the Selenium session
  before: (done) => {
    done();
  },

  // External after hook is ran at the very end of the tests run, after closing the Selenium session
  after: (done) => {
    done();
  },

  // This will be run before each test suite is started
  beforeEach: (browser, done) => {
    done();
  },

  // This will be run after each test suite is finished
  afterEach: (browser, done) => {
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
