//const { RealTimeReporter, ReporterAPI } = require('../../javascript-agent-nightwatch/lib/nightwatch/realTimeReporter');
const { RealTimeReporter, ReporterAPI } = require('@zebrunner/javascript-agent-nightwatch/lib/nightwatch/realTimeReporter');
const config = require('../nightwatch.conf');
let zbrReporter;

module.exports = {
    before: async () => {
        console.log('---GLOBAL BEFORE---');
        zbrReporter = new RealTimeReporter(config);
        await zbrReporter.startTestRun();
    },

    after: async () => {
        console.log('---GLOBAL AFTER---');
        await zbrReporter.finishTestRun();
    },

    beforeEach: (browser, done) => {
        console.log('---GLOBAL BEFORE_EACH---');
        ReporterAPI.init();
        done();
    },

    afterEach: (browser, done) => {
        console.log('---GLOBAL AFTER_EACH---');
        ReporterAPI.destroy();
        done();
    },
};
