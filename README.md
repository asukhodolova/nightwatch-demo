# nightwatch-demo

## Prerequisites

Make sure [Node](https://nodejs.org/en/) is installed on the system.

## Installation

Run `npm install` to install project dependencies.

## Running the tests

Nightwatch also supports other test runners. You can also pick [Mocha](https://nightwatchjs.org/guide/writing-tests/using-mocha.html) or [Cucumber JS](https://nightwatchjs.org/guide/writing-tests/using-cucumberjs.html) as a test runner apart from Nightwatch.

For tests execution using a specific runner, use the command:
1. Nightwatch
    - [BDD Syntax](https://nightwatchjs.org/guide/writing-tests/test-syntax-bdd.html) - `npm run test:nightwatch:bdd`
    - [Exports Syntax](https://nightwatchjs.org/guide/writing-tests/test-syntax-exports.html) - `test:nightwatch:exports`
    - all tests mentioned above - `test:nightwatch:all`
2. Mocha - `npm run test:mocha`
3. Cucumber - `npm run test:cucumber`

To be able to run tests in parallel, add `--workers=4` argument to the command above and make sure enabled is set to `true` in `nightwatch.conf.js`:

   ```js
    test_workers: {
      enabled: true,
      workers: "auto",
    },
   ```

For more CLI arguments, refer to the [documentation](https://nightwatchjs.org/guide/running-tests/using-the-cli-test-runner.html).

## Running with Selenium Grid 

Add argument to the command `--env remote.chrome` for running tests on remote Selenium Grid but before executing make sure you have valid configuration inside `nightwatch.conf.js`:

   ```js
    remote: {
      selenium: {
        start_process: false,
        server_path: "",
        host: "engine.zebrunner.com",
        port: 443,
      },

      username: "username",
      access_key: "access_key",
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
   ```

### Overriding the desired capabilities

1. Using a custom [environment](https://nightwatchjs.org/guide/configuration/define-test-environments.html) defined in `nightwatch.conf.js` with [env variables](https://nightwatchjs.org/guide/configuration/using-env-variables-in-your-config.html). In this case, overriding can be done via running a command:

`BROWSER=firefox npx nightwatch tests/mocha/google.js --env remote.custom`

2. Test suite-specific capabilities: can be overriden only for specific `describe`, for example:

```
describe("Google search", function () {
  this.desiredCapabilities = {
    browserName: 'safari'
  };
  ...
```

3. Using [programmatic API](https://nightwatchjs.org/api/programmatic/#programmatic-api) that can be used for creating your custom runner and update capabilities.

### Rerun the tests

With adding following CLI arguments:
- `--test` - runs only the specified test suite/module. By default the runner will attempt to run all tests in the src_folders settings folder(s) and their subfolders
- `--testcase` - used only together with --test. Runs the specified testcase from the current suite/module

`npx nightwatch --env remote.chrome --test tests/mocha/google.js --testcase "[EXPECT] should find Zebrunner in results SUCCESS"`
