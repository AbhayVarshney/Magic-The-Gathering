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
