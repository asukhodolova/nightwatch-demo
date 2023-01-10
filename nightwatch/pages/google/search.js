/**
 * A Nightwatch page object. The page object name is the filename.
 *
 * Usage:
 *   browser.page.google.search()
 *
 */

const searchCommands = {
  submit() {
    this.waitForElementVisible("@submitButton", 1000).click("@submitButton");

    this.pause(1000);

    return this; // for command-chaining
  },
};

module.exports = {
  url: "https://google.no",

  commands: [searchCommands],

  elements: {
    searchBar: {
      selector: "input[name=q]",
    },

    submitButton: {
      selector: 'input[value="Google Search"]',
    },
  },
};
