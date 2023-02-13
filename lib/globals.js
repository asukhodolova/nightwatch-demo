const { RealTimeReporter, ReporterAPI } = require('../../javascript-agent-nightwatch/lib/nightwatch/realTimeReporter')
const config = require('../nightwatch.conf')
const zbrReporter = new RealTimeReporter(config)

module.exports = {
  // External before hook is ran at the beginning of the tests run, before creating the Selenium session
  before: async (done) => {
    console.log('---GLOBAL BEFORE---')

    ReporterAPI.init()

    await zbrReporter.startTestRun()

    done();
  },

  // External after hook is ran at the very end of the tests run, after closing the Selenium session
  after: async (done) => {
    console.log('---GLOBAL AFTER---')

    await zbrReporter.finishTestRun()

    ReporterAPI.destroy()

    done();
  },

  // This will be run before each test suite is started
  beforeEach: async (browser, done) => {
    done();
  },

  // This will be run after each test suite is finished
  afterEach: async (browser, done) => {
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
