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

    remote: {
      selenium: {
        start_process: false,
        server_path: "",
        host: "engine.zebrunner.com",
        port: 443,
      },

      username: "username",
      access_key: "access_key",

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
