##Documentation:
**Landing:** Login screen. Includes options to log in through Google or Facebook.

**Index:** Main screen, with three sections:<br />
***Input Cards:*** Allows the user to input cards into a deck. The user inputs the name of the deck,
the name of the card, and the number of that card to add to the deck.<br />
***Decks:*** Allows the user to create or select a deck and view the cards in that deck.<br />
***Calculations:*** Allows the user to view statistics about the selected deck,
such as the number of lands or the average converted mana cost.

**firebase.js:** Main code for functionality. Starts by initializing Firebase then has several functions:<br />
***googleSignIn:*** For signing into web app via Google.<br />
***verifyUserCredentialsForIndex:*** Returns user to login screen if not logged in on web app.<br />
***verifyUserCredentialsForLanding:*** Resets login screen if login fails.<br />
***logout:*** Logs user out and returns to login screen.<br />
***UploadCardInfoToDB:*** Adds a card to a user's deck.<br />
***getUserDecks:*** Retrieves all of a user's deck names from the database.<br />
***loadCardList:*** Loads the cards of a selected deck from the database.<br />