const Mocha = require("mocha");
const {
  EVENT_RUN_BEGIN,
  EVENT_RUN_END,
  EVENT_TEST_BEGIN,
  EVENT_TEST_FAIL,
  EVENT_TEST_PASS,
  EVENT_TEST_END,
  EVENT_TEST_PENDING,
  EVENT_SUITE_BEGIN,
  EVENT_SUITE_END,
  EVENT_HOOK_BEGIN,
  EVENT_HOOK_END,
} = Mocha.Runner.constants;

// this reporter outputs test results, indenting two spaces per suite
class CustomReporter extends Mocha.reporters.Base {

  constructor(runner, options) {
    super(runner, options);
    console.log("Configuration:");
    console.log(options);

    this._indents = 0;
    const stats = runner.stats;

    runner
      .once(EVENT_RUN_BEGIN, () => {
        console.log("---EVENT_RUN_BEGIN---");
      })
      .on(EVENT_SUITE_BEGIN, (test) => {
        console.log("---EVENT_SUITE_BEGIN---");
        //console.log(test)
        this.increaseIndent();
      })
      .on(EVENT_SUITE_END, () => {
        console.log("---EVENT_SUITE_END---");
        this.decreaseIndent();
      })
      .on(EVENT_HOOK_BEGIN, () => {
        console.log("---EVENT_HOOK_BEGIN---");
      })
      .on(EVENT_HOOK_END, () => {
        console.log("---EVENT_HOOK_END---");
      })
      .on(EVENT_TEST_BEGIN, () => {
        console.log("---EVENT_TEST_BEGIN---");
      })
      .on(EVENT_TEST_PASS, (test) => {
        // Test#fullTitle() returns the suite name(s)
        // prepended to the test title
        console.log(`---${this.indent()}PASS: ${test.fullTitle()}---`);
      })
      .on(EVENT_TEST_FAIL, (test, err) => {
        console.log(
          `---${this.indent()}FAIL: ${test.fullTitle()} - ERROR: ${err.message
          }---`
        );
      })
      .on(EVENT_TEST_END, (test) => {
        console.log(`---${this.indent()}END: ${test.fullTitle()}---`);
      })
      .on(EVENT_TEST_PENDING, (test) => {
        console.log(`---${this.indent()}PENDING: ${test.fullTitle()}---`);
      })
      .once(EVENT_RUN_END, () => {
        console.log(
          `---EVENT_RUN_END: ${stats.passes}/${stats.passes + stats.failures
          } OK---`
        );
      });
  }

  indent() {
    return Array(this._indents).join("  ");
  }

  increaseIndent() {
    this._indents++;
  }

  decreaseIndent() {
    this._indents--;
  }
}

module.exports = CustomReporter;
