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

        document.getElementById("Statistics-DeckName").innerHTML = "Bob from Accounting";
        document.getElementById("Statistics-AvgCMC").innerHTML = 3.5;
        document.getElementById("Statistics-NumLands").innerHTML = 27;
        document.getElementById("Statistics-NumNoLands").innerHTML = 33;
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
