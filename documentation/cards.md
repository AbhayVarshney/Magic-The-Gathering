## Cards Documentation
### Variables:
**string Name:** The name of the card.

**string ManaCost:** The total mana cost of the card.

**int Cmc:** The converted mana cost of the card.

**string Typeline:** The card's type, along with any supertypes or subtypes the card has.

**string OracleText:** The card's official description.

**int Power:** The card's attack damage.

**int Toughness:** The card's hit points.

**string Colors:** The specific colors of the card.

**string ColorIdentity:** Every color mentioned on the card.

**string Legality:** Which formats the card is legal to use in.

**string Set:** The set the card was printed in.

###Functions:
**Constructor Card:** Generates a card from supplied inputs.<br />
**Inputs:** Card name, mana cost, converted mana cost, type line, Oracle text, power, toughness, color, color identity, legality, and set.

**Constructor Card:** Alternate version of the Constructor Card function that generates a card from a supplied name by retrieving the rest of the relevant data from our database.<br />
**Input:** Card name.

**boolean isLegal:** Takes a given format and sees if the card is legal in that format.<br />
**Input:** Format (as a string).<br />
**Output:** Legality in that format (as a boolean).

**void printCard:** Prints the name of the card.<br />
