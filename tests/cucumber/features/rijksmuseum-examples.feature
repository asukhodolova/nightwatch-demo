@museum
Feature: Rijksmuseum Search
    Background: Background name
        Given I open the Rijksmuseum page
        And I dismiss the cookie dialog
        Then the title is "Rijksmuseum Amsterdam, home of the Dutch masters"

    @pass
    Scenario Outline: Searching the Rijksmuseum
        Given I open search page
        Then the title is "Search - Rijksmuseum"
        When I search "<value>"
        Then Body contains "<result>"

        Examples:
            | value       | result                |
            | night watch | Operation Night Watch |
            | rembrandt   | The Night Watch       |
