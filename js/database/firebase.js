// Initialize Firebase
var config = {
    apiKey: "AIzaSyCT97itbIvnvZfAV_IV-Z2NFSTJp90v_7g",
    authDomain: "magic-thegathering.firebaseapp.com",
    databaseURL: "https://magic-thegathering.firebaseio.com",
    projectId: "magic-thegathering",
    storageBucket: "magic-thegathering.appspot.com",
    messagingSenderId: "315374534915"
};
firebase.initializeApp(config);

googleSignIn = () => {
    base_provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(base_provider).then(function(result) {
        // This gives you Google access token
        // var token = result.credential.accessToken;
        window.location = '../html/dashboard/index.html';
    }).catch(function(err) {
        console.log(err);
        console.log("Failed to connect with Google account");
    })
};

//Handle Account Status - returns whether user is a user or not
verifyUserCredentialsForIndex = () => {
    firebase.auth().onAuthStateChanged(user => {
        if (!user)  //If not currently signed user, user will be redirected to login screen
            window.location = '../../html/landing.html';
        else console.log(user);
    });
};

verifyUserCredentialsForLanding = () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) //If not currently signed user, user will be redirected to login screen
            window.location = '../html/dashboard/index.html';
        else console.log(user);
    });
};

// // if user is already logged in, go to the index page
// isSignedIn = () => {
//     console.log("checking if user is logged in");
//     if(verifyUserCredentials()) {
//         // window.location = '../html/dashboard/index.html'
//     }
// };

// Logout the user from Firebase
logout = () => {
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

UploadCardInfoToDB = () => {
    // const maxCards = 53;
    let deckName = document.getElementById('input.DeckName').value;
    let cardName = document.getElementById('input.CardName').value;
    let quantity = document.getElementById('input.Quantity').value;
    let myToast = new Toasty({ progressBar: true });
    myToast.info("Checking if " + deckName + "is a legal Magic Card...");

    // Firebase Write
    if (deckName.length > 0 && cardName.length > 0) {
        firebase.app().database().ref("DefaultCards").orderByChild("name").equalTo(cardName).once("value", snapshot => {
            if (snapshot.val()) {
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        // Object that we will send to Firebase
                        let childRef = '/users/' + user.uid + '/' + deckName + '/' + cardName.replace(/\s/g, '');
                        firebase.database().ref().child(childRef).set({
                            CardName: cardName,
                            Quantity: parseInt(quantity)
                        });

                        // Handle Toast message for use to notify if operation is successful
                        if(quantity == 0) myToast.success("Successfully removed " + cardName + " from " + deckName);
                        else myToast.success("Successfully added " + cardName + " to " + deckName);
                    }
                });
            } else myToast.error(cardName + " is not a legal magic card.");
        });
    } else myToast.error("All inputs must be of length greater than 0 in the Input Cards section");
};

getUserDecks = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var scoresRef = firebase.database().ref("users/" + user.uid);
            scoresRef.orderByValue().on("value", function(snapshot) {
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

function loadCardList() {
    firebase.auth().onAuthStateChanged((user) => {
        let deckName = document.getElementById('input.ChooseDeckName').value;
        if (user && deckName.length > 0) {
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

                // append children from firebase
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

GetCardProperties = (cardName) => {
    Card newCard;
    newCard.name = cardName;
    firebase.app().database().ref("DefaultCards").orderByChild("name").equalTo(cardName).once("value", snapshot => {
        newCard.ManaCost = firebase.database().ref("DefaultCards/" + snapshot.val() + "/mana_cost");
        newCard.CMC = firebase.database().ref("DefaultCards/" + snapshot.val() + "/cmc");
        newCard.typeLine = firebase.database().ref("DefaultCards/" + snapshot.val() + "/type_line");
        newCard.OracleText = firebase.database().ref("DefaultCards/" + snapshot.val() + "/oracle_text");
        newcard.Power = firebase.database().ref("DefaultCards/" + snapshot.val() + "/power");
        newCard.Toughness = firebase.database().ref("DefaultCards/" + snapshot.val() + "/toughness");
        newCard.Colors = firebase.database().ref("DefaultCards/" + snapshot.val() + "/colors");
        newCard.ColorIdentity = firebase.database().ref("DefaultCards/" + snapshot.val() + "/color_identity");
        let legalities = [];
        legalities.push(firebase.database().ref("DefaultCards/" + snapshot.val() + "/legality_standard");)
        legalities.push(firebase.database().ref("DefaultCards/" + snapshot.val() + "/legality_future");)
        legalities.push(firebase.database().ref("DefaultCards/" + snapshot.val() + "/legality_frontier");)
        legalities.push(firebase.database().ref("DefaultCards/" + snapshot.val() + "/legality_modern");)
        legalities.push(firebase.database().ref("DefaultCards/" + snapshot.val() + "/legality_legacy");)
        legalities.push(firebase.database().ref("DefaultCards/" + snapshot.val() + "/legality_pauper");)
        legalities.push(firebase.database().ref("DefaultCards/" + snapshot.val() + "/legality_vintage");)
        legalities.push(firebase.database().ref("DefaultCards/" + snapshot.val() + "/legality_penny");)
        legalities.push(firebase.database().ref("DefaultCards/" + snapshot.val() + "/legality_commander");)
        legalities.push(firebase.database().ref("DefaultCards/" + snapshot.val() + "/legality_1v1");)
        legalities.push(firebase.database().ref("DefaultCards/" + snapshot.val() + "/legality_duel");)
        legalities.push(firebase.database().ref("DefaultCards/" + snapshot.val() + "/legality_brawl");)
        newCard.Legality = legalities;
    }




    scoresRef.orderByValue().on("value", function(snapshot) {
        let decks = [];
        snapshot.forEach(function(data) {
            decks.push(data.key)
        });

}

// gets list of all card names from database:
/*
firebase.app().database().ref("DefaultCards").orderByChild("name").once("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        console.log(childSnapshot.val().name);
    }) });
 */