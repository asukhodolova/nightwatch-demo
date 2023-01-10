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

To be able to run in parallel, add `--parallel` argument, for example:

`npm run test:cucumber -- --parallel=2`

For more CLI arguments, refer to the [documentation](https://nightwatchjs.org/guide/running-tests/using-the-cli-test-runner.html).
