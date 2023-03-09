//const { ZebrunnerConfigurator } = require("../javascript-agent-nightwatch");
const { ZebrunnerConfigurator } = require("@zebrunner/javascript-agent-nightwatch");

module.exports = {
  // An array of folders (excluding subfolders) where your tests are located;
  // if this is not specified, the test source must be passed as the second argument to the test runner.
  src_folders: ["tests"],

  // See https://nightwatchjs.org/guide/concepts/page-object-model.html
  page_objects_path: ["nightwatch/pages"],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-commands.html
  custom_commands_path: ["nightwatch/custom-commands"],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-assertions.html
  custom_assertions_path: ["nightwatch/custom-assertions"],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-plugins.html
  plugins: [],

  // See https://nightwatchjs.org/guide/concepts/test-globals.html
  globals_path: "lib/globals.js",

  webdriver: {},

  test_workers: {
    enabled: true,
    workers: "auto",
  },

  live_output: true,
  parallel_process_delay: 3000,

  reporterOptions: {
    zebrunnerConfig: {
      enabled: true,
      projectKey: 'ANNAS',
      server: {
        hostname: 'https://solvdinternal.zebrunner.com/',
        accessToken: 'CAve1wEDfcbfWuhMdtoPHAaDdaMCOyaUUR7ykFRvi7YwipX6Ee'
      },
      run: {
        displayName: "Nightwatch run",
        build: 'alpha-1',
        environment: 'Local',
        locale: 'en_US',
        labels: {
          runner: 'Alice',
          reviewer: 'Bob',
        },
        artifactReferences: {
          landing: 'https://zebrunner.com',
        },
      },
      milestone: {
        id: 1,
        name: 'Release 1.0.0',
      },
      notifications: {
        notifyOnEachFailure: false,
        slackChannels: 'dev, qa',
        teamsChannels: 'dev-channel, management',
        // emails: 'asukhodolova@solvd.com',
      },
      tcm: {
        testCaseStatus: {
          onPass: '',
          onFail: '',
        },
        zebrunner: {
          pushResults: false,
          pushInRealTime: true,
          testRunId: 17,
        },
        testRail: {
          pushResults: false,
          pushInRealTime: true,
          suiteId: 174,
          runId: 642,
          includeAllTestCasesInNewRun: true,
          runName: 'Nightwatch Run',
          milestoneName: 'Nightwatch milestone',
          assignee: 'developer@zebrunner.com',
        },
        xray: {
          pushResults: false,
          pushInRealTime: true,
          executionKey: 'QT-1',
        },
        zephyr: {
          pushResults: false,
          pushInRealTime: true,
          jiraProjectKey: 'QT',
          testCycleKey: 'QT-R5',
        },
      },
    }
  },

  test_settings: {
    default: {
      disable_error_log: false,
      launch_url: "http://localhost",

      screenshots: {
        enabled: true,
        path: "screens",
        on_failure: true,
        on_error: true,
      },

      desiredCapabilities: {
        browserName: "chrome",
        "goog:chromeOptions": {
          w3c: true,
          args: ["start-maximized"],
        },
      },

      webdriver: {
        start_process: true,
        server_path: "",
      },
    },

    zebrunner: ZebrunnerConfigurator.configureLauncher({
      selenium: {
        start_process: false,
        server_path: '',
        host: 'engine.zebrunner.com',
        port: 443,
      },

      username: 'solvdinternal',
      access_key: 'O9JjPcqxJ0hPs685',

      webdriver: {
        start_process: false,
      },
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          w3c: true,
        },
        'zebrunner:provider': 'ZEBRUNNER',
      },
    }),

    mocha_tests: {
      test_runner: {
        type: "mocha",
        options: {
          ui: "bdd",
          reporter: "../javascript-agent-nightwatch/index.js",
          reporterOptions: {
            zebrunnerConfig: {
              enabled: true,
              projectKey: 'ALEX',
              server: {
                hostname: 'https://solvdalexkirillov.zebrunner.com',
                accessToken: 'EGRk61Xxl41T5XyWkdsJDgslkgUdULrmYpYiS0Zt65YT5NGjr6'
              },
              run: {
                displayName: "Demo run",
                build: 'alpha-1',
                environment: 'Local',
              },
            }
          }
        },
      },
    },

    cucumber_tests: {
      test_runner: {
        type: "cucumber",
        options: {
          feature_path: "tests/cucumber/features/*.feature",
          auto_start_session: false,
        },
      },
    },
  },
};
