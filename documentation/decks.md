## Decks Documentation
### Variables:
**Card DeckList[]:** List of cards in the deck.

**Double AverageCMC:** Average converted mana cost of the cards in the deck.

**Int NumberOfLands:** The number of cards of the type "Land" in the deck.

**Int NumberOfNonLands:** The number of cards of other types besides "Land" in the deck.

**string Format:** The format this deck is built for.

###Functions:
**Constructor Deck:** Generates a deck from supplied inputs.<br />
**Inputs:** List of cards, average converted mana cost, number of lands, number of non-lands, and format.

**void CalcCMC:** Calculates the average converted mana cost of the cards in the deck and sets the deck's AverageCMC variable to this value.<br />

**void CalcLands:** Counts the number of "Land" type cards in the deck and sets the deck's NumberOfLands variable to this value and NumberOfNonLands variable to this value subtracted from the total number of cards in the deck.<br />

**boolean verify:** Checks that all cards in the DeckList[] variable are legitimate cards.<br />
**Output:** True boolean if entire deck is legitimate, False boolean if there is at least one non-legitimate card in the deck.

**void shuffle:** Shuffles the cards in the deck randomly.

**double OddsOfCard:** Calculates the odds of drawing a particular card in your deck a certain number of times in a certain number of cards drawn.<br />
**Inputs:** Name of card to draw, number of successful draws desired, maximum number of cards to draw.<br />
**Output:** Odds of drawing the card that many times in that many draws, in the form of a double.
