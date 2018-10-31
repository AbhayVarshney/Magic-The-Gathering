/* @Objective Create the Card class with the following attributes
   "A": "name",
   "B": "mana_cost",
   "C": "cmc",
   "D": "type_line",
   "E": "oracle_text",
   "F": "power",
   "G": "toughness",
   "H": "colors",
   "I": "color_identity",
   "J": "legality_standard",
   "L": "legality_frontier",
   "M": "legality_modern",
   "N": "legality_legacy",
   "O": "legality_pauper",
   "P": "legality_vintage",
   "Q": "legality_penny",
   "R": "legality_commander",
   "S": "legality_1v1",
   "T": "legality_duel",
   "U": "legality_brawl",
   "V": "set"
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
