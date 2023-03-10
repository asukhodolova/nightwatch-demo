/**
 * A Nightwatch page object. The page object name is the filename.
 *
 * Usage:
 *   browser.page.google.searchResults()
 *
 */

const util = require("util");
const menuXpath = '//div[contains(@class, "hdtb-mitem")][contains(., "%s")]';

const menuCommands = {
  productIsSelected: function (product, callback) {
    var self = this;

    return this.getAttribute(product, "class", function (result) {
      let isSelected = result.value.indexOf("hdtb-msel") > -1;
      callback.call(self, isSelected);
    });
  },
};

const searchCommands = {
  openFirstResult() {
    this.waitForElementVisible("@firstResult", 1000).click("@firstResult");
    return this;
  },
};

module.exports = {
  elements: {
    results: { selector: "#rso" },
    firstResult: {
      selector: '//*[@id="search"]//a',
      locateStrategy: "xpath",
      index: 0,
    },
  },

  commands: [searchCommands],

  sections: {
    menu: {
      selector: "#hdtb-msb",
      commands: [menuCommands],
      elements: {
        all: {
          selector: util.format(menuXpath, "All"),
          locateStrategy: "xpath",
          index: 0,
        },
        video: {
          selector: util.format(menuXpath, "Videos"),
          locateStrategy: "xpath",
          index: 0,
        },
        images: {
          selector: util.format(menuXpath, "Images"),
          locateStrategy: "xpath",
          index: 0,
        },
        news: {
          selector: util.format(menuXpath, "News"),
          locateStrategy: "xpath",
          index: 0,
        },
      },
    },
  },
};
