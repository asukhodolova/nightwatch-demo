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
