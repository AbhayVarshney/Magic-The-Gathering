// Initialize FireBase with configuration key
let config = {
    apiKey: "AIzaSyCT97itbIvnvZfAV_IV-Z2NFSTJp90v_7g",
    authDomain: "magic-thegathering.firebaseapp.com",
    databaseURL: "https://magic-thegathering.firebaseio.com",
    projectId: "magic-thegathering",
    storageBucket: "magic-thegathering.appspot.com",
    messagingSenderId: "315374534915"
};
firebase.initializeApp(config);

/**
 * googleSignIn()
 * For landing.html, when user clicks google sign in button, firebase should authenticate user's google account
 * @return null
 */
googleSignIn = () => {
    base_provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(base_provider).then(function() {
        // This gives you Google access token
        // var token = result.credential.accessToken;
        window.location = '../html/dashboard/index.html';
    }).catch(function(err) {
        console.log(err);
        console.log("Failed to connect with Google account");
    })
};

/**
 * verifyUserCredentialsForIndex()
 * Handle Account Status - returns whether user is a user or not (FOR INDEX.HTML ONLY)
 * Navigates to landing page if browser cookies already contains firebase token
 * @return null
 */
verifyUserCredentialsForIndex = () => {
    firebase.auth().onAuthStateChanged(user => {
        if (!user)  //If not currently signed user, user will be redirected to login screen
            window.location = '../../html/landing.html';
        else console.log(user);
    });
};

/**
 * verifyUserCredentialsForIndex()
 * Handle Account Status - returns whether user is a user or not (FOR LANDING.HTML ONLY)
 * Navigates to index page if user is not logged in
 * @return null
 */
verifyUserCredentialsForLanding = () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) //If not currently signed user, user will be redirected to login screen
            window.location = '../html/dashboard/index.html';
        else console.log(user);
    });
};

/**
 * logoutUser()
 * When user clicks logout button, user will be navigated to landing html
 * @return null
 */
logoutUser = () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        return firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // User is still signed in.
                console.log(user);
                console.log("user is still logged in")
            } else {
                // No user is signed in. go to landing page
                window.location = '../landing.html'
            }
        });
    }, function(error) {
        // An error happened.
        console.log(error)
    });
};

/**
 * uploadCardInfoToDB()
 * When user clicks 'Upload' button, cardName/quantity/deckname should be written to FireBase
 * Includes toast to keep user updated with what's going on
 * @return null
 */
uploadCardInfoToDB = () => {
    const MAX_CARDS = 4;
    let deckName = document.getElementById('input.DeckName').value;
    let cardName = document.getElementById('input.CardName').value;
    let quantity = document.getElementById('input.Quantity').value;
    let myToast = new Toasty({ progressBar: true });
    myToast.info("Checking if " + cardName + " is a legal Magic Card and can be added to " + deckName + "...");

    // Ensure that the deck and card names are valid in length
    if (deckName.length > 0 && cardName.length > 0) {
        // Ensure that the magic card name that the user inputted is valid
        firebase.app().database().ref("DefaultCards").orderByChild("name").equalTo(cardName).once("value", snapshot => {
            if (snapshot.val()) {
                // Obtain the current user object from FireBase
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        if(parseInt(quantity) <= MAX_CARDS) {
                            // FireBase will write Object to database
                            let childRef = '/users/' + user.uid + '/' + deckName + '/' + cardName.replace(/\s/g, '');
                            firebase.database().ref().child(childRef).set({
                                CardName: cardName,
                                Quantity: parseInt(quantity)
                            });

                            // Handle Toast message for use to notify if operation is successful
                            if(parseInt(quantity) === 0) myToast.success("Successfully removed " + cardName + " from " + deckName);
                            else myToast.success("Successfully added " + cardName + " to " + deckName);
                        } else {
                            myToast.error("Too many cards that you are trying to add");
                        }
                    }
                });
            } else myToast.error(cardName + " is not a legal magic card.");
        });
    } else myToast.error("All inputs must be of length greater than 0 in the Input Cards section");
};


// Obtains total quantity of cards in FireBase - MUST be less than MAX_CARDS
// firebase.app().database().ref("users/" + user.uid + "/" + deckName).orderByChild("CardName").once("value", (snapshot) => {
//     let numCardsInDeck = 0;
//     snapshot.forEach(function(childSnapshot) {
//         // Only count all cards except the card that the user is trying to add
//         if(childSnapshot.val().CardName !== cardName)
//             numCardsInDeck += childSnapshot.val().Quantity
//     }) ;
/**
 * getUserDecks()
 * Verifies the user, gets user object from Firebase, and then gets list of all the decks for the user
 * @return null
 */
getUserDecks = () => {
    // Obtain the current user object from FireBase
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // Verifies if card exists in All Magic Card Database
            var firebaseRef = firebase.database().ref("users/" + user.uid);
            firebaseRef.orderByValue().on("value", function(snapshot) {
                let decks = [];
                snapshot.forEach(function(data) {
                    decks.push(data.key)
                });

                let options = '';
                for(let cancel = 0; cancel < decks.length; cancel++)
                    options += '<option value="'+decks[cancel]+'" />';
                document.getElementById('screens.screenid-datalist').innerHTML = options;
            });
        }
    });
};

/**
 * loadCardList()
 * Verifies the user, gets user object from FireBase, gets all the cards of the user within a specific deck from
 * FireBase, and then populates the cards section with those details
 * @return null
 */
function loadCardList() {
    // Obtain the current user object from FireBase
    firebase.auth().onAuthStateChanged((user) => {
        let deckName = document.getElementById('input.ChooseDeckName').value.trim();
        if (user && deckName.length > 0) {
            // Get a list of all the card names using deck name from FireBase
            const allCardsPath = "users/" + user.uid + "/" + deckName;
            firebase.app().database().ref(allCardsPath).orderByChild("CardName").on("value", function(snapshot) {
                let userMagicCards = [];
                snapshot.forEach(function(childSnapshot) {
                    for(let i = 0; i < childSnapshot.val().Quantity; i++)
                        userMagicCards.push(childSnapshot.val().CardName)
                });

                let list = document.getElementById('cardList');
                // clear all children of list
                while (list.firstChild)
                    list.removeChild(list.firstChild);

                // Append children from FireBase to HTML DOM
                for(let cancel = 0; cancel < userMagicCards.length; cancel++) {
                    let li = document.createElement("li");
                    li.setAttribute("id", "cardlist-" + userMagicCards[cancel]);
                    li.setAttribute("class", "magicCard");
                    li.appendChild(document.createTextNode(userMagicCards[cancel]));
                    list.appendChild(li)
                }
            });
        }
    });
}

// GetCardProperties = (cardName) => {
//
// }
// getCardProperties = (cardName) => {
//     Card newCard;
//     newCard.name = cardName;
//     firebase.app().database().ref("DefaultCards").orderByChild("name").equalTo(cardName).once("value", snapshot => {
//         newCard.ManaCost = firebase.database().ref("DefaultCards/" + snapshot.val() + "/mana_cost");
//         newCard.CMC = firebase.database().ref("DefaultCards/" + snapshot.val() + "/cmc");
//         newCard.typeLine = firebase.database().ref("DefaultCards/" + snapshot.val() + "/type_line");
//         newCard.OracleText = firebase.database().ref("DefaultCards/" + snapshot.val() + "/oracle_text");
//         newcard.Power = firebase.database().ref("DefaultCards/" + snapshot.val() + "/power");
//         newCard.Toughness = firebase.database().ref("DefaultCards/" + snapshot.val() + "/toughness");
//         newCard.Colors = firebase.database().ref("DefaultCards/" + snapshot.val() + "/colors");
//         newCard.ColorIdentity = firebase.database().ref("DefaultCards/" + snapshot.val() + "/color_identity");
//         let legalities = [];
//         legalities.push(firebase.database().ref("DefaultCards/" + snapshot.val() + "/legality_standard");)
//         legalities.push(firebase.database().ref("DefaultCards/" + snapshot.val() + "/legality_future");)
//         legalities.push(firebase.database().ref("DefaultCards/" + snapshot.val() + "/legality_frontier");)
//         legalities.push(firebase.database().ref("DefaultCards/" + snapshot.val() + "/legality_modern");)
//         legalities.push(firebase.database().ref("DefaultCards/" + snapshot.val() + "/legality_legacy");)
//         legalities.push(firebase.database().ref("DefaultCards/" + snapshot.val() + "/legality_pauper");)
//         legalities.push(firebase.database().ref("DefaultCards/" + snapshot.val() + "/legality_vintage");)
//         legalities.push(firebase.database().ref("DefaultCards/" + snapshot.val() + "/legality_penny");)
//         legalities.push(firebase.database().ref("DefaultCards/" + snapshot.val() + "/legality_commander");)
//         legalities.push(firebase.database().ref("DefaultCards/" + snapshot.val() + "/legality_1v1");)
//         legalities.push(firebase.database().ref("DefaultCards/" + snapshot.val() + "/legality_duel");)
//         legalities.push(firebase.database().ref("DefaultCards/" + snapshot.val() + "/legality_brawl");)
//         newCard.Legality = legalities;
//     }
//
//
//
//
//     scoresRef.orderByValue().on("value", function(snapshot) {
//         let decks = [];
//         snapshot.forEach(function(data) {
//             decks.push(data.key)
//         });
//
// }

// gets list of all card names from database:
/*
firebase.app().database().ref("DefaultCards").orderByChild("name").once("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        console.log(childSnapshot.val().name);
    }) });
 */