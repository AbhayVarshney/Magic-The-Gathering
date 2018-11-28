window.onload = () => {
    loadDeckInput();
    loadCardList();
    verifyUserCredentialsForIndex();
};

function loadDeckInput() {
    // stale data
    var decks = new Array();
    decks[0]='Main Deck';
    decks[1]='Backup Deck';
    decks[2]='Abhays deck';

    var options = '';
    for(let cancel = 0; cancel < decks.length; cancel++)
        options += '<option value="'+decks[cancel]+'" />';
    document.getElementById('screens.screenid-datalist').innerHTML = options;
}

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

function loadCardList() {
    firebase.auth().onAuthStateChanged((user) => {
        let deckName = document.getElementById('input.ChooseDeckName').value;
        if (user && deckName.length > 0) {
            const allCardsPath = "users/" + user.uid + "/" + deckName.replace(/\s/g, '');
            firebase.app().database().ref(allCardsPath).orderByChild("CardName").on("value", function(snapshot) {
                let cards = [];
                snapshot.forEach(function(childSnapshot) {
                    console.log(childSnapshot.val().CardName);
                    for(let i = 0; i < childSnapshot.val().Quantity; i++) {
                        cards.push(childSnapshot.val().CardName)
                    }
                });

                let list = document.getElementById('cardList');
                // clear all children of list
                while (list.firstChild) {
                    list.removeChild(list.firstChild);
                }

                // append children from firebase
                for(let cancel = 0; cancel < cards.length; cancel++) {
                    let li = document.createElement("li");
                    li.setAttribute("id", "cardlist-" + cards[cancel]);
                    li.setAttribute("class", "magicCard");
                    li.appendChild(document.createTextNode(cards[cancel]));
                    list.appendChild(li)
                }
            });
        }
    });
}