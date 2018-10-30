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

verifyUserCredentials = () => {
    //Handle Account Status
    firebase.auth().onAuthStateChanged(user => {
        if (!user) window.location = '../../html/landing.html'; //If not currently signed user, user will be redirected to login screen
    })
};

