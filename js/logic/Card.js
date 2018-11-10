/*
*/

class Card {
    // constructor(name, manaCost, cmc, type, Oracle, power, toughness, color, colorI, Legal, set, quantity, cost) {
    constructor(card) {

        this.Name = card.name;
        this.ManaCost = card.manaCost;
        this.CMC = card.cmc;
        this.typeLine = card.typeLine;
        this.OracleText = card.OracleText;
        this.Power = card.Power;
        this.Toughness = card.Toughness;
        this.Colors = card.Colors;
        this.ColorIdentity = card.ColorI;
        this.Legality = card.Legality;
        this.Set = card.set;
        this.Quantity = card.Quantity;
        this.Cost = card.Cost;
    }

    // Returns the power of the creature if its a creature, otherwise returns -1
    getPower() {
        if (this.typeLine.includes('Creature'))
            return this.Power;
        return -1;
    }

    // Returns the toughness of the creature if it's a creature, otherwise returns -1
    getToughness() {
        if (this.typeLine.includes('Creature'))
            return this.Toughness;
        return -1;
        //Display error not a creature.
    }

    isLegal(format)// Takes a given format and sees if the card is legal in that format.
    {
        //let limit = this.Legality.length;
        for (let i = 0; i < 1000; i++) {
            if (this.Legality.includes(format))
                return true;
        }
        return false;
    }


}

/*
   @Objective Create a Deck class that has the following variables and member functions
   Double AverageCMC
   void Shuffle() Shuffles the deck
   void CalcCmc() Finds the average CMC of the deck.
   void Calclands()
   void CalcNonLands()
   void Verify() Makes sure that every card in the list is a valid card that we can recognize
   void OddsOfCard Utilizes Hypergeometric distribution to find the likely hood of drawing specific cards.
*/
class Deck {
    constructor(name, deckList, format) {
        this.DeckList = new Array(60);
        this.Size = 0;
        let landCount = 0;
        let nonLandCount = 0;
        let DeckCmc = 0;
        deckList.forEach((element) => {
            let i = 0;
            this.DeckList[++i] = element;
            this.Size += element.Quantity;                                                                          // adds how many copies of the card into the deck size.
            this.DeckCost += (element.Cost * element.Quantity);
            DeckCmc += element.CMC * element.Quantity;                                     // Calculates the average Cmc in the decklist by adding each cards converted mana cost into a sum and then divides them by the total number of cards in the deck.
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
    }

    OpeningHand(mulliganCount) {
        let Hand = new Array(7);
        let HANDSIZE = 7;
        let lands = 0;
        let nonLands = 0;
        do {
            if (mulliganCount === 0) {
                this.shuffle();
                for (let i = 0; i <= HANDSIZE; i++) {
                    Hand[i] = this.DeckList[i];
                    if (Hand[i].typeLine().contains('land')) {
                        land++;
                    }
                    else
                        nonlands++;
                }
                return this.Hand;           // returns an array of cards that represents the players hand
            }
            else {
                HANDSIZE--;
            }
        }
        while (HANDSIZE > 0)
    }

    shuffle() {
        let NewDeckList = new Array(this.Size);
        let deckCount = this.Size;
        do {
            let i = Math.floor((Math.random() * this.Size) + 1);                                            // needs to be a random number between 1 and the size of the deck
            if (i <= this.Size && deckCount !== 0 && NewDeckList[i].isEmpty()) {                         // checks if the slot is empty or not and only changes it when it its empty.
                NewDeckList[i] = c;
                deckCount--;
            }
        }
        while (deckCount !== 0)               // continue this process as long as the deck is not filled
    }

    OddsOfCard(cards, successes, cardsDrawn) {
        let odds;
        let deckSize = this.Size;
        // number of possible cards to hit
        // Checks to see if we only have one card to look for
        if (cards.length === 1) {
            /*
                N choose K = ((N!)/(K!(N-K!))
                Given K = number of sucesses possilbe in the pool
                L = Number of sucesses wanted from the pool
                N = size of the pool
                X = number of chances to draw
                (K Choose L)*(N-K Choose L-K)/ (N choose X)
            */

            let kFact = 1;
            let lFact = 1;
            let nFact = 1;
            let xFact = 1;
            for (let i = cards[0].Quantity; i > 1; i--)
                kFact *= i;
            for (let i = successes; i > 1; i--)
                lFact *= i;
            for (let i = deckSize; i > 1; i--)
                nFact *= i;
            for (let i = cardsDrawn; i > 1; i--)
                xFact *= i;
            let nMinuskFact = nFact - kFact;
            let lMinuskFact = lFact - kFact;
            let First = (kFact / lFact * (kFact - lFact));
            let Second = (nMinuskFact / ((nMinuskFact - lMinuskFact) * (lMinuskFact)));
            let Third = (nFact / (xFact - nFact));
            odds = (First * Second) / Third;

            /*
            let top = (kFact / (lFact *(kFact - lFact)) * (nMinuskFact / (lMinuskFact)*(nMinuskFact - lMinuskFact)));
            let bot = (nFact / (xFact - nFact));
            odds = top / bot;
            */
            return odds;
        }
        else        // need to add up the probabilites for multiple cards
        {

        }

        return 1.0;
    }

}


// Constructor Card (name, manaCost,cmc,type,Oracle,power,toughness,color,colorI,Legal,set,quantity,cost)
var Birdobj = {
    name: "Birds of Paradise",
    manaCost: "G",
    cmc: 1,
    typeLine: "Creature-Bird",
    OracleText: "Flying, T:add one mana of any color",
    Power: 0,
    Toughness: 1,
    color: "Green",
    colorI: "Green",
    Legality: "Legacy Commander Modern",
    set: "Alpha",
    Quantity: 4,
    Cost: 7
};
var Boltobj = {
    name: "Lightning Bolt",
    manaCost: "R",
    cmc: 2,
    typeLine: "Instant",
    OracleText: "Lightning Bolt deals 3 damage to any target",
    color: "Red",
    colorI: "Red",
    Legality: "Legacy Commander Modern",
    set: "Alpha",
    Quantity: 4,
    Cost: 3
}
//let Bird = new Card("Birds of Paradise", "G", 1, "Creature-Bird", "Flying , T:add one mana of any color", 0, 1, "Green", "Green", " Legacy Commander Modern ", "Alpha", 4, 7);
let Bird = new Card(Birdobj);
let Bolt = new Card(Boltobj);
let decklist = [Bird, Bolt];
let boltTheBird = new Deck("Fried chicken", decklist, "Modern");
console.log(Bird.Name);
console.log(Bird.ManaCost);
console.log(Bird.Legality);
console.log(Bird.CMC);
console.log(Bird.typeLine);
console.log(Bird.Cost);
console.log(Bird.Quantity);
console.log(Bird.Power);
console.log(Bird.Toughness);
console.log(Bolt.Name);
console.log(Bolt.getPower());
console.log(Bolt.getToughness());
console.log(boltTheBird.Name);
console.log(boltTheBird.Size);
console.log(boltTheBird.averageCMC);
console.log(boltTheBird.DeckCost);
console.log(boltTheBird.nonLandCount);
console.log(boltTheBird.OddsOfCard([Bird], 1, 1));
