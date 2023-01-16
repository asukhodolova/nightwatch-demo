class Storage {
  #testRunId;
  #testExecutions = [];

  get testRunId() {
    return this.#testRunId;
  }

  set testRunId(id) {
    this.#testRunId = id;
  }

  createTestExecution = (name) => {
    this.#testExecutions.push({ name, isSent: false });
  };

  #getTestExecutionByName = (name) => {
    return this.#testExecutions.find((el) => el.name === name);
  };

  addIdToTestExecution = (id, name) => {
    this.#getTestExecutionByName(name).id = id;
  };

  getTestExecutionIdByName = (name) => {
    return this.#testExecutions.find((el) => el.name === name)?.id;
  };

  updateTestExecutionSentStatus = (name, isSent) => {
    this.#testExecutions.find((el) => el.name === name).isSent = isSent;
  };

  addDataToTestExecution = (name, data) => {
    this.#getTestExecutionByName(name).data = data
  };

  getAllTestExecutions = () => {
    return this.#testExecutions;
  };

  getAllUnsentTestExecutions = () => {
    return this.#testExecutions.filter((el) => el.isSent === false);
  };

  resetAllTestExecutions = () => {
    this.#testExecutions = [];
  };
}

module.exports = Storage;
