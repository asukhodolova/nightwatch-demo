const axios = require("axios");

class Client {
  #baseUrl;
  #apiToken;
  #accessToken;

  constructor(config) {
    this.#baseUrl = config.baseUrl;
    this.#apiToken = config.apiToken;
  }

  startTestRun = async (projectKey, name, environment, buildVersion) => {
    try {
      const { data } = await axios.post(
        `${this.#baseUrl}/api/reporting/v1/test-runs?projectKey=${projectKey}`,
        {
          name: name,
          startedAt: new Date().toISOString(),
          status: "IN_PROGRESS",
          framework: "Nightwatch",
          config: {
            environment: environment,
            build: buildVersion,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.#accessToken}`,
          },
        }
      );

      return data.id;
    } catch (e) {
      console.log("client startTestRun", e);
    }
  };

  finishTestRun = async (testRunId) => {
    try {
      await axios.put(
        `${this.#baseUrl}/api/reporting/v1/test-runs/${testRunId}`,
        {
          endedAt: new Date().toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${this.#accessToken}`,
          },
        }
      );
    } catch (e) {
      console.log("client finishTestRun", e);
    }
  };

  startTestExecution = async (testRunId, testExecutionData) => {
    try {
      const { data } = await axios.post(
        `${this.#baseUrl}/api/reporting/v1/test-runs/${testRunId}/tests`,
        testExecutionData,
        {
          headers: {
            Authorization: `Bearer ${this.#accessToken}`,
          },
        }
      );

      return { name: data.name, id: data.id };
    } catch (e) {
      console.log("client startTextExecution", e);
    }
  };

  finishTestExecution = async (
    testRunId,
    testExecutionId,
    finishTestExecutionData
  ) => {
    try {
      await axios.put(
        `${
          this.#baseUrl
        }/api/reporting/v1/test-runs/${testRunId}/tests/${testExecutionId}`,
        finishTestExecutionData,
        {
          headers: {
            Authorization: `Bearer ${this.#accessToken}`,
          },
        }
      );
    } catch (e) {
      console.log("client finishTestExecution", e);
    }
  };

  getAccessToken = async () => {
    try {
      const { data } = await axios.post(
        `${this.#baseUrl}/api/iam/v1/auth/refresh`,
        {
          refreshToken: this.#apiToken,
        }
      );

      this.#accessToken = data.authToken;
    } catch (e) {
      console.log("client getAccessToken", e);
      process.exit(0);
      // TODO: Implement logger here or at least show somehow an error
    }
  };
}

module.exports = Client;
