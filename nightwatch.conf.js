// Refer to the online docs for more details:
// https://nightwatchjs.org/gettingstarted/configuration/
//

//  _   _  _         _      _                     _          _
// | \ | |(_)       | |    | |                   | |        | |
// |  \| | _   __ _ | |__  | |_ __      __  __ _ | |_   ___ | |__
// | . ` || | / _` || '_ \ | __|\ \ /\ / / / _` || __| / __|| '_ \
// | |\  || || (_| || | | || |_  \ V  V / | (_| || |_ | (__ | | | |
// \_| \_/|_| \__, ||_| |_| \__|  \_/\_/   \__,_| \__| \___||_| |_|
//             __/ |
//            |___/

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
    enabled: false,
    workers: "auto",
  },

  zebrunner: {
    // video: false,
    // videoUploadOnPasses: false,
    // reporter: "./modules/lib/cypress-zebrunner.js",
    hostName: "https://solvdalexkirillov.zebrunner.com",
    apiToken: "EGRk61Xxl41T5XyWkdsJDgslkgUdULrmYpYiS0Zt65YT5NGjr6",
    projectKey: "ALEX",
    environment: "STAGE",
    buildVersion: "1.0.1",
    name: "Nightwatch Agent",
    // reporterOptions: {
    //   reportingServerHostname: "https://dev.zebrunner.org",
    //   reportingServerAccessToken:
    //     "zh1bPucM5EI0Lqq5tqqyqyM0ZbSm6Etz3ywLrtvVYQ2XiIe2FK",
    //   reportingProjectKey: "RNS",
    //   reportingRunEnvironment: "STAGE",
    //   reportingRunBuild: "1.0-alpha",
    //   reportingRunDisplayName: "Tst",
    //   reportingRunLocale: "en_US",
    // },
  },

  parallel_process_delay: 3000,

  test_settings: {
    default: {
      disable_error_log: false,
      launch_url: "http://localhost",

      screenshots: {
        enabled: true,
        path: "screens",
        on_failure: true,
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

    remote: {
      // Info on all the available options with "selenium":
      // https://nightwatchjs.org/guide/reference/settings.html#selenium-server-settings
      selenium: {
        start_process: false,
        server_path: "",
        host: "localhost",
        port: 4444,
      },

      username: "${REMOTE_USERNAME}",
      access_key: "${REMOTE_ACCESS_KEY}",

      webdriver: {
        keep_alive: true,
        start_process: false,
      },
    },

    "remote.chrome": {
      extends: "remote",
      desiredCapabilities: {
        browserName: "chrome",
        "goog:chromeOptions": {
          w3c: true,
        },
      },
    },

    "remote.custom": {
      extends: "remote",
      desiredCapabilities: {
        browserName: "${BROWSER}",
      },
    },

    mocha_tests: {
      test_runner: {
        type: "mocha",
        options: {
          ui: "bdd",
          reporter: "list",
          // uncomment to use custom Mocha reporter
          reporter: "lib/custom-mocha-reporter.js",
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
