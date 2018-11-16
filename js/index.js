function UploadCardInfo() {
    var deckName = document.getElementById('screens.screenid').value;
    console.log("screen id:", document.getElementById('screens.screenid').value); //WORKS
    var myToast = new Toasty({
        progressBar: true,
    });
    // myToast.error("message here");
    myToast.success("Card is added to " + deckName);
}