/*
   @Objective Create a Deck class that has the following variables and member functions
   CalcCmc() Finds the average CMC of the deck.
   Calclands
   CalcNonLands
   OddsOfCard() Utilizes Hypergeometric distribution to find the likely hood of drawing specific cards.

*/

class Deck {
    constructor(name, deckList, format) {
        let land = 0, nonLand = 0, DeckCmc = 0, size = 0;
        deckList.forEach((element) => {
            size += element.Quantity;
            // Calculates the average Cmc in the decklist by adding each cards converted mana cost into a sum
            // and then divides them by the total number of cards in the deck.
            DeckCmc = (DeckCmc + (element.CMC * element.Quantity));
            if (element.typeLine.includes("land") || element.typeLine.includes("Land")) {
                land += element.Quantity;
            }
            else {
                nonLand += element.Quantity;
            }
        });
        this.Size = size;
        this.landCount = land;
        this.nonLandCount = nonLand;
        this.Name = name;
        this.averageCMC = DeckCmc / size;
        this.Format = format;
    }

    OddsOfCard(quantity, successes, cardsDrawn) {
        // number of possible cards to hit
        // Checks to see if we only have one card to look for

        /*
            N choose K = ((N!)/(K!(N-K!))
            Given
            K = number of successes possible in the pool
            L = Number of successes wanted from the pool
            N = size of the pool
            X = number of chances to draw
            (K Choose L)*(N-K Choose X-L)/ (N choose X)
            ((K!)/(L!(K-L)!))*((n-k)!/(l-k)!((n-k)-(x-l))!) / (n!)/(x!(n-x)!)
            first = (K!)/(L!)(K-L)
            second = (n-k)!/(l-k)!((N-K)-(X-L))!
            (n-k)!/(l-k)!((N-K-X+L))!
            third = (N!)/(X!(N-X)!)
        */
        let copiesAvail = quantity;
        let successesWanted = successes;
        let deckSize = this.Size;
        let cardsToDraw = cardsDrawn;
        // K and L are relatively small and can be computed normally
        let kFact = 1;
        let lFact = 1;
        let lMinusKFact = 1;
        for (let i = copiesAvail; i > 0; i--) {
            kFact = kFact * i;
        }

        for (let i = successesWanted; i > 0; i--) {
            lFact *= i;
        }

        for (let i = (successesWanted - copiesAvail); i > 0; i--) {
            lMinusKFact *= i;
        }
        let first = kFact / lMinusKFact;
        first = first / lFact;
        let secondProduct = 1;
        let secondScaling = 1;

        // N-K and X-L Factorial are going to be large so they must be computed more carefully
        // X fact and N factorial need to be treated specially because N is expected to be at least 60.
        let ratio1 = cardsToDraw - successesWanted;
        let ratio2 = (deckSize - copiesAvail - cardsToDraw) + successesWanted;
        if (ratio1 < ratio2)                                                                                           // comparing to see if N-K is greater than (n - k - x + l)
        {
            secondScaling = ratio1;                                                                                     // divide by the larger quantity to keep the number small
            for (let i = (ratio1 - ratio2); i > 0; i--) {
                secondProduct = (secondProduct * i) / secondScaling;
                secondScaling--;
            }
            if (secondScaling !== 0)                                                                                    // finishes any remaining divisions
            {
                for (secondScaling; secondScaling > 0; secondScaling--) {
                    secondProduct /= secondScaling;
                }
            }
        }
        else // n-l-x+l is the smaller of the ratios
        {
            secondScaling = ratio2;                                                                                      //(deckSize - copiesAvail - cardsToDraw + successesWanted);
            for (let i = (ratio2 - ratio1); i > 0; i--) {
                secondProduct = (secondProduct * i) / secondScaling;
                secondScaling--;
            }
            if (secondScaling !== 0) {
                for (secondScaling; secondScaling > 0; secondScaling--) {
                    secondProduct /= secondScaling;
                }
            }
        }
        let second = secondProduct;

        let third = 1;
        let thirdScaling = cardsToDraw;
        for (let i = deckSize - cardsToDraw; i < deckSize; i++)           // i = n! can be reduced to (n - (n-x))
        {
            if (thirdScaling > 0) {
                third *= i / thirdScaling;                                              // also divides by x! intill x! is diminished by (n!)/(x-n)!
                thirdScaling--;
            }
            else
                third *= i;
        }
        first = first / third;
        second = second / third;
        let odds = first * second;
        return odds;
    }

}
