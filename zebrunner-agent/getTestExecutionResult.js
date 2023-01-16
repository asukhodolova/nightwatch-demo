const TEST_EXECUTIONS_STATUSES = require("./testExecutionsStatuses");

const getTestExecutionResult = (testCaseResults) => {
  if (testCaseResults.skipped !== 0) {
    return {
      result: TEST_EXECUTIONS_STATUSES.SKIPPED,
      reason: null,
    };
  }

  if (testCaseResults.failed !== 0) {
    const failedAssertion = testCaseResults.assertions.find(
      (el) => el.failure !== false
    );

    return {
      result: TEST_EXECUTIONS_STATUSES.FAILED,
      reason: `${failedAssertion.stackTrace}<br/>${failedAssertion.fullMsg}`,
    };
  }

  return {
    result: TEST_EXECUTIONS_STATUSES.PASSED,
    reason: null,
  };
};

module.exports = getTestExecutionResult;
