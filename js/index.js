// Run these functions to fill out HTML element data one page load
window.onload = () => {
    getUserDecks();
    loadCardList();
    verifyUserCredentialsForIndex();
};

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
