// Run these functions to fill out HTML element data one page load
window.onload = () => {
    getUserDecks();
    loadCardList();
    verifyUserCredentialsForIndex();
};

/*
        Takes the deck and displays the output to the user, giving them the:
         Deck name,
         Average converted mana cost,
         number of land cards and number of non land cards
         Then allowing the user to take advantage of Odds of cards
*/
function loadDecksToSelect()
{
        // let deck = ;
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
    };
    var ForestObj = {
        name: "Forest",
        manaCost: " ",
        cmc: 0,
        typeLine: "Basic Land - Forest",
        OracleText: "T : add green mana",
        color: "Colorless",
        colorI: "Green",
        Legality: " Legacy Commander Modern Standard",
        set: "Alpha",
        Quantity: 12,
        Cost: .01

    };
//let Bird = new Card("Birds of Paradise", "G", 1, "Creature-Bird", "Flying , T:add one mana of any color", 0, 1, "Green", "Green", " Legacy Commander Modern ", "Alpha", 4, 7);
    let Bird = new Card(Birdobj);
    let Bolt = new Card(Boltobj);
    let Forest = new Card(ForestObj);
    let decklist = [Bird, Bolt,Forest];
    let boltTheBird = new Deck("Fried chicken", decklist, "Modern");

        document.getElementById("Statistics-DeckName").innerHTML = boltTheBird.Name;  //"Bob from Accounting";
        document.getElementById("Statistics-AvgCMC").innerHTML = boltTheBird.averageCMC;
        document.getElementById("Statistics-NumLands").innerHTML = boltTheBird.landCount;
        document.getElementById("Statistics-NumNoLands").innerHTML = boltTheBird.nonLandCount;
}

/*
        takes the information from the deck to
        allow the user to find out the probability
        of drawing that card within a given set of cards.

 */

function loadOddsofCards()
{
    // let deck = ;
    // let cardName = document.getElementById("dropdown").innerHTML;
    console.log("whats up");

}


/**
 * checkExt()
 * @description Verifies if the file that the user is trying to upload is a .txt file
 * @return boolean
 */
function checkExt() {
    if(document.getElementById('fileupload').value.lastIndexOf(".txt") === 1) {
        // not a txt file
        alert("Please upload only .txt extention file");
        return false;
    } else {
        // is a txt file
        alert("Correct file type");
        return true
    }
}

/**
* isNumberKey()
* @param evt - input event
* @description Only allows users to input #s
* @return boolean
*/
function isNumberKey(evt) {
    let charCode = (evt.which) ? evt.which : evt.keyCode;
    // Added to allow decimal, period, or delete
    if (charCode == 110 || charCode == 190 || charCode == 46) return true;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    return true;
}
