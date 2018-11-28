/*
   @Objective Create a Deck class sthat has the following variables and member functions
   Double AverageCMC
   CalcCmc() Finds the average CMC of the deck.
    Calclands
   CalcNonLands
   Verify Makes sure that every card in the list is a valid card that we can recognize
   OddsOfCard() Utilizes Hypergeometric distribution to find the likely hood of drawing specific cards.
*/
//<script src = 'Card.js"> </script>
   // import Card() from Card.js;
class Deck {
    constructor(name, deckList, format) {
        this.DeckList = new Array(100);
        this.Size = 0;
        let landCount = 0;
        let nonLandCount = 0;
        let DeckCmc = 0;
        let deckCost = 0;
        deckList.forEach((element) => {
            let i = 0;
            this.DeckList[++i] = element;
            this.Size += element.Quantity;                                                                               // adds how many copies of the card into the deck size.
            deckCost += element.Cost * element.Quantity;
            DeckCmc += element.CMC * element.Quantity;                                                                   // Calculates the average Cmc in the decklist by adding each cards converted mana cost into a sum and then divides them by the total number of cards in the deck.
            if (element.typeLine.includes('land')) {
                landCount += element.Quantity;
            }
            else {
                nonLandCount += element.Quantity;
            }
        });
        this.landCount = landCount;
        this.nonLandCount = nonLandCount;
        this.Name = name;
        this.averageCMC = DeckCmc / this.Size;
        this.Format = format;
        this.DeckCost = deckCost;
    }

    OddsOfCard(cards, successes, cardsDrawn) {
        let odds;
        // number of possible cards to hit
        // Checks to see if we only have one card to look for

        /*
            N choose K = ((N!)/(K!(N-K!))
            Given K = number of successes possible in the pool
            L = Number of successes wanted from the pool
            N = size of the pool
            X = number of chances to draw
            (K Choose L)*(N-K Choose X-L)/ (N choose X)
            ((K!)/(L!(K-L)!))*((n-k)!/(l-k)!((n-k)-(x-l))!) / (n!)/(x!(n-x)!)
            second = (n-k)!/(l-k)!((N-K)-(X-L))!
            (n-k)!/(l-k)!((N-K-X+L))!
        */

        let k = cards.Quantity;
        let l = successes;
        let n = this.Size;
        let x = cardsDrawn;
        // K and L are relatively small and can be computed normally
        let kFact = 1;
        let lFact = 1;
        let lMinusKFact = 1;
        // N-K and X-L Factorial are going to be large so they must be computed more carefully
        // X fact and N factorial need to be treated specially because N is expected to be at least 60.
        for (let i = k; i > 0; i--) {
            kFact = kFact * i;
        }
        for (let i = l; i > 0; i--) {
            lFact *= i;
        }
        for (let i = (l - k) + 1; i > 0; i--) {
            lMinusKFact *= i;
        }
        let first = kFact / (lFact * (lMinusKFact));
        let a = 1;
        let j = 1;

        if ((x - l) > (n - k - x + l)) {
            j = (x - l);
            for (let i = ((n - k - x + l) - (x - l)); i > 0; i--) {
                a = (a * i) / j;
                j--;
            }
            if (j !== 0) {
                for (j; j > 0; j--) {
                    a /= j;
                }
            }
        }
        else // n-l-x+l is the smaller of the ratios
        {
            j = (n - k - x + l);
            for (let i = ((x - l) - (n - k - x + l)); i > 0; i--) {
                a = (a * i) / j;
                j--;
            }
            if (j !== 0) {
                for (j; j > 0; j--) {
                    a /= j;
                }
            }
        }
        let second = a;
        let third = 1;
        let c = x;
        for (let i = ((n - (n - x)) + 1); i > 0; i--) {
            if (c > 0) {
                third *= i / c;
                c--;
            }
            else
                third *= i;
        }
        odds = (first * second) / third;
        return odds;
    }

}


