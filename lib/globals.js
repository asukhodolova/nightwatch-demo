const { ZebrunnerReporter, ZebrunnerReporterAPI } = require('../../javascript-agent-nightwatch/lib/nightwatch/realTimeReporter');
//const { ZebrunnerReporter, ZebrunnerReporterAPI } = require('@zebrunner/javascript-agent-nightwatch/lib/nightwatch/realTimeReporter');
const config = require('../nightwatch.conf');
let zbrReporter;

module.exports = {
    before: async () => {
        console.log('---GLOBAL BEFORE---');
        zbrReporter = new ZebrunnerReporter(config);
        await zbrReporter.startTestRun();
    },

    after: async () => {
        console.log('---GLOBAL AFTER---');
        await zbrReporter.finishTestRun();
    },

    beforeEach: (browser, done) => {
        console.log('---GLOBAL BEFORE_EACH---');
        ZebrunnerReporterAPI.startTestSession(browser);
        done();
    },

    afterEach: (browser, done) => {
        console.log('---GLOBAL AFTER_EACH---');
        ZebrunnerReporterAPI.finishTestSession(browser);
        done();
    },

    async onBrowserNavigate(browser) {
        console.log('---GLOBAL onBrowserNavigate---');
        return Promise.resolve();
    },

    async onBrowserQuit(browser) {
        console.log('---GLOBAL onBrowserQuit---');
        return Promise.resolve();
    },
};
