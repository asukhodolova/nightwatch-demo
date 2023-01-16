const startIPCServer = require("./startIPCServer");
const stopIPCServer = require("./stopIPCServer");
const AGENT_EVENTS = require("./agentEvents");
const Client = require("./client");
const Storage = require("./storage");

class Agent {
  #config;
  #client;
  #storage;

  constructor(config) {
    this.#initIPCServer();

    this.#config = config.zebrunner;
    this.#client = new Client({
      baseUrl: config.zebrunner.hostName,
      apiToken: config.zebrunner.apiToken,
    });
    this.#storage = new Storage();
  }

  #initIPCServer = () => {
    startIPCServer(this.#subscribeServerEvents, this.#unsubscribeServerEvents);
  };

  #terminateIPCServer = () => {
    this.#storage.testRunId = null;
    this.#storage.resetAllTestExecutions();

    stopIPCServer(this.#unsubscribeServerEvents);
  };

  #startTestExecution = async (testExecutionData) => {
    const testExecutionName = testExecutionData.name;

    this.#storage.createTestExecution(testExecutionName);

    const { id, name } = await this.#client.startTestExecution(
      this.#storage.testRunId,
      testExecutionData
    );

    this.#storage.addIdToTestExecution(id, name);
  };

  #finishTestExecution = async (testExecutionData) => {
    const testExecutionName = testExecutionData.name;

    const testExecutionId = this.#storage.getTestExecutionIdByName(
      testExecutionName
    );

    if (testExecutionId) {
      delete testExecutionData.name;

      this.#client.finishTestExecution(
        this.#storage.testRunId,
        testExecutionId,
        testExecutionData
      );

      this.#storage.updateTestExecutionSentStatus(testExecutionName, true);
    }

    this.#storage.addDataToTestExecution(testExecutionName, testExecutionData);
  };

  #finishUnsentTestExecutions = async () => {
    const allUnsentTestExecutions = this.#storage.getAllUnsentTestExecutions();

    allUnsentTestExecutions.map((el) => {
      this.#client.finishTestExecution(this.#storage.testRunId, el.id, el.data);

      this.#storage.updateTestExecutionSentStatus(el.name, true);
    });
  };

  #subscribeServerEvents = (server) => {
    server.on(AGENT_EVENTS.START_TEST_EXECUTION, this.#startTestExecution);
    server.on(AGENT_EVENTS.FINISH_TEST_EXECUTION, this.#finishTestExecution);
    server.on(
      AGENT_EVENTS.FINISH_UNSENT_TEST_EXECUTIONS,
      this.#finishUnsentTestExecutions
    );
  };

  #unsubscribeServerEvents = (server) => {
    server.off(AGENT_EVENTS.START_TEST_EXECUTION, "*");
    server.off(AGENT_EVENTS.FINISH_TEST_EXECUTION, "*");
    server.off(AGENT_EVENTS.FINISH_UNSENT_TEST_EXECUTIONS, "*");
  };

  startTestRun = async () => {
    await this.#client.getAccessToken();

    this.#storage.testRunId = await this.#client.startTestRun(
      this.#config.projectKey,
      this.#config.name,
      this.#config.environment,
      this.#config.buildVersion
    );
  };

  finishTestRun = async () => {
    await this.#client.finishTestRun(this.#storage.testRunId);

    this.#terminateIPCServer();
  };
}

module.exports = Agent;
