Feature: Service for Movie tickets order
   
        Scenario: reservation cinema tests
        Given user is on page1 "https://qamid.tmweb.ru/client/index.php"
        When user selects the desired day
        Then user selects the desired movie
        Then user chooses a location
        Then user is booking tickets
        Then user confirms the booking "Забронировать"

        Scenario: Mickey Mouse negative
        Given user is on page2 "http://qamid.tmweb.ru/client/index.php"
        When user selects the desired day2
        Then user selects the desired movie2
        Then user selects the occupied place
        Then user has booked tickets
        Then user has confirmed the booking of tickets
        Then Get Error "Забронировать"
        