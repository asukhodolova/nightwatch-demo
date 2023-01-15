class Storage {
  #testRunId;
  #testExecutions = [];

  get testRunId() {
    return this.#testRunId;
  }

  set testRunId(id) {
    this.#testRunId = id;
  }

  addTestExecution = (id, name) => {
    this.#testExecutions.push({ name, id });
  };

  getTestExecutionIdByName = (name) => {
    return this.#testExecutions.find((el) => el.name === name).id;
  };

  resetAllTestExecutions = () => {
    this.#testExecutions = [];
  };
}

module.exports = Storage;
