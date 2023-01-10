@museum
Feature: Rijksmuseum Search
    Background: Background name
        Given I open the Rijksmuseum page
        And I dismiss the cookie dialog
        Then the title is "Rijksmuseum Amsterdam, home of the Dutch masters"

    @pass
    Scenario: Searching the Rijksmuseum
        Given I open search page
        Then the title is "Search - Rijksmuseum"
        When I search "night watch"
        Then Body contains "Operation Night Watch"

    @pass
    Scenario: Searching the Rijksmuseum-1
        Given I open search page
        Then the title is "Search - Rijksmuseum"
        When I search "night watch"
        Then Body contains "The Night Watch, Rembrandt van Rijn, 1642"

    @fail
    Scenario: Searching the Rijksmuseum-2
        Given I open search page
        Then the title is "Search - Rijksmuseum"
        When I search "night watch"
        Then Body contains "Nightwatch.js"
