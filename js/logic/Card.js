/* 
*/

class Card
{
    Constructor (name, manaCost,cmc,type,Oracle,power,toughness,color,colorI,Legal,set,quantity,cost)
    {
      this.Name = name;
      this.ManaCost = manaCost;
      this.CMC = cmc;
      this.Typeline = type;
      this.OracleText = Oracle;
      this.Power= power;
      this.Toughness = toughness;
      this.Colors= color;
      this.ColorIdentity = colorI;
      this.Legality = Legal;
      this.Set=set;
      this.Quantity = quantity;
      this.Cost = cost;

      return this;
    }
/*
    Constructor (name)
  {
    /*
    It's unclear how I reference our database and use that to populate this card.
    var cardRef = firebase.database().ref("magic-thegathering");
     cardRef.orderByChild("name").startAt(name).on("value", function(snapshot) TODO
     {

        <script src="https://www.gstatic.com/firebasejs/5.5.7/firebase.js"></script>
        <script>
         // Initialize Firebase
          // TODO: Replace with your project's customized code snippet
        var config = {
            apiKey: "<API_KEY>",
         authDomain: "<PROJECT_ID>.firebaseapp.com",
         databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
         projectId: "<PROJECT_ID>",
         storageBucket: "<BUCKET>.appspot.com",
         messagingSenderId: "<SENDER_ID>",
        };
        firebase.initializeApp(config);
        </script>
     });
  */
  getName()
  {
    return this.Name;
  }
  getManaCost()
  {
      return this.ManaCost;
  }
  getTypeLine()
  {
     return this.Typeline;
  }
  getOracle()
  {
      return this.OracleText;
  }
  getPower()
  {
     if(this.Typeline.contains('Creature'))
        return this.Power;

      //Display error not a creature TODO.
  }
  getToughness()
  {
      if (this.Typeline.includes('Creature'))
        return this.Toughness;

      //Display error not a creature.
  }
  getColors()
  {
      return this.Colors;
  }
  getCMC()
  {
      return this.CMC;
  }
  getColorIdentity()
  {
      return this.ColorIdentity;
  }
  getLegality()
  {
    // return this.Legality;
    let formats = " ";
            for (let i =0; i < this.Legality.length ; i++)
            {
                  if(this.Legality[i] === "legal")
                  {
                      formats.append(this.Legality[i] + ", ");
                  }

            }
  }
  isLegal(format)// Takes a given format and sees if the card is legal in that format.
  {
    for (let i = 0; i< this.Legality.length; i++)
    {
      if(this.Legality[i] === "legal" && this.Legality[i] === format)
        return true;
    }
    return false;
  }
  getSet()
  {
    return this.Set;
  }
  getQuantity() {
    return this.Quantity;
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
class Deck
{
    DeckList;

    constructor (name, deckList ,format)
    {
        this.Size = 0;
        let landCount = 0;
        let nonLandCount = 0;
        let DeckCmc = 0 ;
        for( let i = deckList.length(); i >= 0; i--)
        {
            this.DeckList[i] = deckList[i];
            this.Size += deckList[i].Quantity;                                                                          // adds how many copies of the card into the deck size.
            this.Cost += (deckList[i].Cost * deckList[i].Quantity);
            DeckCmc += this.DeckList[i].getCMC() * this.DeckList[i].getQuantity() ;                                     // Calculates the average Cmc in the decklist by adding each cards converted mana cost into a sum and then divides them by the total number of cards in the deck.
            if(this.DeckList[i].getTypeLine.includes('land'))
            {
                landCount += this.DeckList[i].Quantity;
            }
            else {
                nonLandCount += this.DeckList[i].Quantity;
            }
        }
        this.setLandCount(landCount);
        this.setNonLandCount(nonLandCount);
        this.Name = name;
        this.AverageCMC = DeckCmc/this.Size;
        this.Format = format;

    }
    getSize()
    {
        return this.Size;
    }
     setACMC(cmc)
     {
      this.AverageCMC = cmc;
     }

     setLandCount(land)
     {
         this.NumberOfLands = land;
     }
      setNonLandCount(nonLand)
      {
         this.NumberOfNonLands = nonLand;
      }
    OpeningHand(mulliganCount)
    {
        Hand;
        let HANDSIZE = 7;

        do{
            if(mulliganCount ===0) {
                this.shuffle();
                for (let i = 0; i <= HANDSIZE; i++) {
                    Hand[i] = this.DeckList[i];
                }
                return this.Hand;           // returns an array of cards that represents the players hand
            }
            else {
                HANDSIZE--;
            }
        }
        while( HANDSIZE > 0)
    }
   shuffle()
   {
       let NewDeckList = this.DeckList;
       let deckCount = this.Size;
       do {
               let i = Math.random();
               if (i <= this.Size && deckCount !== 0 && NewDeckList[i].isEmpty()) {                         // checks if the slot is empty or not and only changes it when it its empty.
                   NewDeckList[i] = c;
                   deckCount--;
               }
       }
           while(deckCount !== 0)               // continue this process as long as the deck is not filled
   }

   OddsOfCard(cards,successes,cardsDrawn)
    {
        let odds;
        let deckSize = this.DeckList.size();
        let totalCards = 0; // number of possible cards to hit
        if (cards.length() === 1)
        {
            /*
                N choose K = ((N!)/(K!(N-K!))
                Given K = number of sucesses possilbe in the pool
                L = Number of sucesses wanted from the pool
                N = size of the pool
                X = number of chances to draw
                (K Choose L)*(N-K Choose L-K)/ (N choose X)
            */
            for (let i = deckSize; i >= 0; i--)
            {
                if (this.DeckList[i].name === cards[1])
                {
                    totalCards++;
                }
            }
            let kFact = 1;
            let lFact = 1;
            let nFact = 1;
            let xFact = 1;
            for (let i = (totalCards-1); i > 1; i--)
                kFact *= i;
            for( let i = successes - 1 ; i > 1 ; i--)
                lFact *= i;
            for( let i = deckSize - 1; i > 1; i--)
                nFact *= i;
            for( let i = cardsDrawn - 1; i > 1; i--)
                xFact *= i;
            let nMinuskFact = nFact-kFact;
            let lMinuskFact = lFact-kFact;
            let top = (kFact/(lFact(kFact-lFact)) * (nMinuskFact / (lMinuskFact)(nMinuskFact - lMinuskFact)));
            let bot = (nFact /(xFact - nFact));
            odds = top/bot;
            return odds;
        }
        else        // need to add up the probabilites for multiple cards
        {

        }

        return 1.0;
    }
    
}
// Constructor Card(name,manaCost,cmc,type,Oracle,power,toughness,color,colorI,Legal,set)

Bird = Card("Birds of Paradise", "G" ,1, "Creature-Bird", "Flying , T:add one mana of any color", "Green", "Green" , " Legacy Commander Modern ","Alpha");
console.log(Bird.name);
console.log(Bird.ManaCost);
console.log(Bird.CMC);
console.log(Bird.getCMC());
console.log(Bird.Typeline);
console.log(Bird.getTypeLine());