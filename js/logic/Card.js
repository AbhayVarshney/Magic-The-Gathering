/* 
*/
Class Card
{
    string Name;
    string ManaCost;
    int Cmc;
    string Typeline;
    string OracleText;
    int Power;
    int Toughness;
    string Colors;
    string ColorIdenidty;
    string Legality;
    string Set;
    Constructor Card(name,manaCost,cmc,type,Oracle,power,toughness,color,colorI,Legal,set)
    {
      this.Name = name;
      this.ManaCost = manaCost;
      this.Typeline = type;
      this.OracleText = Oracle;
      this.Power= power;
      this.Toughness = toughness;
      this.Colors= color;
      this.ColorIdenidty = colorI;
      this.Legality = Legal;
      this.Set=set;
    }
    Constructor Card(string name)
  {
    /* 
    It's unclear how I reference our database and use that to populate this card.
    var cardRef = firebase.database().ref("magic-thegathering");
     cardRef.orderByChild("name").startAt(name).on("value", function(snapshot)
     {
        
     });
     */
      if() // the name exists in our data base
      {
          this.Name = name;
          this.ManaCost = " "// get mana cost ;
          this.SuperTypes = {" "} ;
          this.Subtypes = {" "} ;
          this.OracleText = " " ;
          this.Power= 0 ;
          this.Toughness = 0 ;
          this.Colors= {" "};
          this.ColorIdenidty ={ " "} ;
          this.Legality = " ";
          this.Set= " " ;
      }
      else
      {
         //Display error card not found.
      }
  }
  string getName()
  {
    return this.Name;
  }
  int getManaCost()
  {
      return this.ManaCost;
  }
  string getTypeLine()
  {
     return this.TypeLine;
  }
  string getOracle()
  {
      return this.Oracle;
  }
  int getPower()
  {
     if(this.typeline.contains('Creature'))
        return this.Power;
      
      //Display error not a creature TODO.
  }
  int getToughness()
  {
      if (this.typeline.includes('Creature'))
        return this.Toughness;
      
      //Display error not a creature.
  }
  string getColors()
  {
      return this.Colors;
  }
  string getColorIdendity()
  {
      return this.ColorIdendity;    
  }
  string getLegality()
  {
    // return this.Legality;
    string formats = " ";
            for ( int i =0; i < this.Legality.length ; i++)
            {
                  if(this.Legality[i] = "legal")
                  {
                      formats.append(this.Legality[i] + ", ");        
                  }
                 
            }
  }
  boolean isLegal(string format)// Takes a given format and sees if the card is legal in that format.
  {
    for (int i =0; i< this.Legality.length; i++)
    {
      if(this.Legality[i] = "legal" && this.Legality[i] == format)
        return true;
    }
    return false;
  }
  string getSet()
  {
    return this.Set;
  }
    
}
   /*
      @Objective Create a Deck class that has the following variables and member functions
      Dobule AverageCMC
      void Shuffle() Shuffles the deck
      void CalcCmc() Finds the average CMC of the deck.
      void Calclands()
      void CalcNonLands()
      void Verify() Makes sure that every card in the list is a valid card that we can recognize
      void OddsOfCard Utilizes Hypergeometric distrubtuion to find the likely hood of drawing specific cards.
   */

class Deck
{
    Card DeckList[];
    Dobule AverageCMC;
    Int NumberOfLands;
    Int NumberOfNonLands;
    string Format;
    
    constructor Deck(Card list[], double ACMC, int NumLands, int NumNonLands,format)
    {
        for( int i = list.size(); i >= 0; i--)
        {
            this.DeckList[i] = list[i];
        }
        this.AverageCMC = ACMC;
        this.NumberOfLands = NumLands;
        this.NumberOfNonLands = NumNonLands;
       this.Format = format;
    }
    void setACMC(double cmc)
      {
      this.AverageCMC = cmc;
      }
    void setLandCount(int land)
      {
            this.NumberofLands = land;
      }
    void setNonLandCount(int nonLand)
   {
         this.NumberOfNonLands = nonLand;
   }
    void CalcCMC()
    {
        double DeckCmc;
        for( int i = Decklist.size(); i >=0; i--)
        {
           DeckCmc += Decklist[i].getCmc();
        }
        DeckCmc /= Decklist.size();
        Deck.setACMC(DeckCmc);
    }
   void CalcLands()
   {
      int landCount,nonLandCount;
       for (int i = DeckList[].size; i >= 0 ; i--)
       {
          if(Decklist[i].Typeline.includes('land'))
          {
             landCount++;
          }
          else
          {
             nonLandCount;
          }
       }
      this.setLandCount(landCount);
      this.setNonLandCount(nonLandCount);
   }
   void shuffle()
   {
      
   }
    
}
