const connectICPClient = require("./connectIPClient")
const disconnectICPClient = require("./disconnectIPCClient")
const publishICPEvent = require("./publishIPCEvent")
const AGENT_EVENTS = require("./agentEvents");
const RESULT_STATUSES = require('./resultStatuses')

const AgentReporter = {
    init: () => {
        console.log('AgentReporter INIT')
        connectICPClient()
    },
    terminate: () => {
        console.log('AgentReporter TERMINATE')
        disconnectICPClient()
    },
    startTestExecution: (currentTest) => {
        const testExecution = {
            name: currentTest.name,
            className: currentTest.module,
            // TODO: what is method name???
            methodName: 'featureTest()',
            startedAt: new Date(currentTest.timestamp).toISOString()
        }

        publishICPEvent(AGENT_EVENTS.START_TEST_EXECUTION, testExecution)
    },
    finishTestExecution: (currentTest) => {
        const testExecution = {
            name: currentTest.name,
            result: RESULT_STATUSES[currentTest.results.status],
            // TODO: Find where to take reason
            "reason": "NullPointerException: bla bla bla",
            endedAt: new Date(currentTest.timestamp).toISOString()
        }

        publishICPEvent(AGENT_EVENTS.FINISH_TEST_EXECUTION, testExecution)
    }
}

module.exports = AgentReporter
