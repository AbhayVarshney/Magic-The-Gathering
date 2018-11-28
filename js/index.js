window.onload = () => {
    getUserDecks();
    loadCardList();
    verifyUserCredentialsForIndex();
};

// function loadDeckInput() {
//     // stale data
//     var decks = new Array();
//     decks[0]='Main Deck';
//     decks[1]='Backup Deck';
//     decks[2]='Abhays deck';
//
//     var options = '';
//     for(let cancel = 0; cancel < decks.length; cancel++)
//         options += '<option value="'+decks[cancel]+'" />';
//     document.getElementById('screens.screenid-datalist').innerHTML = options;
// }

function checkExt() {
    if(document.getElementById('fileupload').value.lastIndexOf(".txt") === 1) {
        alert("Please upload only .txt extention file");
        return false;
    } else {
        alert("Correct file type")
    }
}

function isNumberKey(evt) {
    let charCode = (evt.which) ? evt.which : evt.keyCode;
    // Added to allow decimal, period, or delete
    if (charCode == 110 || charCode == 190 || charCode == 46) return true;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    return true;
}
