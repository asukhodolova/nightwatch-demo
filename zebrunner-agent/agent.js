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
    // CONFIG {
    //   hostName: 'https://solvdalexkirillov.zebrunner.com',
    //       apiToken: 'EGRk61Xxl41T5XyWkdsJDgslkgUdULrmYpYiS0Zt65YT5NGjr6',
    //       projectKey: 'ALEX',
    //       environment: 'STAGE',
    //       buildVersion: '1.0.1',
    //       name: 'Nightwatch Agent'
    // }
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
    this.#storage.resetAllTestExecutions()

    stopIPCServer(this.#unsubscribeServerEvents);
  };

  #startTestExecution = async (testExecutionData) => {
    const { id, name } = await this.#client.startTestExecution(
      this.#storage.testRunId,
      testExecutionData
    );

    this.#storage.addTestExecution(id, name);
  };

  #finishTestExecution = async (testExecutionData) => {
    const testExecutionId = this.#storage.getTestExecutionIdByName(
      testExecutionData.name
    );
    delete testExecutionData.name;

    this.#client.finishTestExecution(
      this.#storage.testRunId,
      testExecutionId,
      testExecutionData
    );
  };

  #subscribeServerEvents = (server) => {
    server.on(AGENT_EVENTS.START_TEST_EXECUTION, this.#startTestExecution);
    server.on(AGENT_EVENTS.FINISH_TEST_EXECUTION, this.#finishTestExecution);
  };

  #unsubscribeServerEvents = (server) => {
    server.off(AGENT_EVENTS.START_TEST_EXECUTION, "*");
    server.off(AGENT_EVENTS.FINISH_TEST_EXECUTION, "*");
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
