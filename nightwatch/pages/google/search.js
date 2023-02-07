/**
 * A Nightwatch page object. The page object name is the filename.
 *
 * Usage:
 *   browser.page.google.search()
 *
 */

const searchCommands = {
  submit() {
    this.sendKeys('@searchBar',browser.Keys.ENTER);
    this.pause(1000);
    return this;
  }
};

const consentModal = '[aria-modal="true"]';

module.exports = {
  url: 'https://google.no',
  commands: [
    searchCommands
  ],

  sections: {
    consentModal: {
      selector: consentModal,
      elements: {
        rejectAllButton: '.GzLjMd button:nth-child(1)'
      }
    }
  },

  elements: {
    consentModal,

    searchBar: {
      selector: 'input[name=q]'
    },

    submitButton: {
      selector: 'input[type="submit"]'
    }
  }
};
