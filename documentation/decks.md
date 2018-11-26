## Decks Documentation
### Variables:
**Card DeckList[]:** List of cards in the deck.

**int Size:** Number of cards in the deck.

**int landCount:** The number of cards of the type "Land" in the deck.

**int nonLandCount:** The number of cards of other types besides "Land" in the deck.

**int DeckCmc:** The total converted mana cost of all the cards in the deck.

**int DeckCost:** Total monetary value of all the cards in the deck.

**string Name::** Name of the deck.

**double averageCMC:** Average converted mana cost of the cards in the deck.

**string Format:** The format this deck is built for.

###Functions:
**constructor:** Generates a deck from supplied inputs. Calculates the average converted mana cost of the cards in the deck and counts the number of lands in the deck and sets the deck's variables to these values.<br />
**Inputs:** Name of the deck, array of cards in the deck, and format of the deck.

**OpeningHand:** Draws seven cards from the deck at random.<br />
**Inputs:** Number of times the user wants to "mulligan" their hand.
**Output:** An array of cards that represents the players hand.

**void shuffle:** Shuffles the cards in the deck randomly and draws the top card.

**double OddsOfCard:** Calculates the odds of drawing a particular card in your deck a certain number of times in a certain number of cards drawn.<br />
**Inputs:** Name of card to draw, number of successful draws desired, and maximum number of cards to draw.<br />
**Output:** Odds of drawing the card that many times in that many draws, in the form of a double.
