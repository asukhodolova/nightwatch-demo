const connectICPClient = require("./connectIPClient");
const disconnectICPClient = require("./disconnectIPCClient");
const publishICPEvent = require("./publishIPCEvent");
const AGENT_EVENTS = require("./agentEvents");
const getTestExecutionResult = require("./getTestExecutionResult");

const AgentReporter = {
  init: () => {
    connectICPClient();
  },
  terminate: () => {
    publishICPEvent(AGENT_EVENTS.FINISH_UNSENT_TEST_EXECUTIONS);
    disconnectICPClient();
  },
  startTestExecution: (currentTest) => {
    const testExecution = {
      name: currentTest.name,
      className: currentTest.module,
      // TODO: what is method name???
      methodName: "featureTest()",
      startedAt: new Date(currentTest.timestamp).toISOString(),
    };

    publishICPEvent(AGENT_EVENTS.START_TEST_EXECUTION, testExecution);
  },
  finishTestExecution: (currentTest) => {
    const { result, reason } = getTestExecutionResult(
      currentTest.results.testcases[currentTest.name]
    );

    const testExecution = {
      name: currentTest.name,
      result,
      ...(reason && { reason }),
      endedAt: new Date(currentTest.timestamp).toISOString(),
    };

    publishICPEvent(AGENT_EVENTS.FINISH_TEST_EXECUTION, testExecution);
  },
};

module.exports = AgentReporter;
