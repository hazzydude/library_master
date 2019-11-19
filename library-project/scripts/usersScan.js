

let scannedCode = document.getElementById("scannedCode");



function toIndex() {
    window.location.href = "./index.html";
}

function toUserPage() {
    fetch("http://localhost:8080/user/" + scannedCode.value)
        .then(status)
        .then(res => res.json())
        //.then(json => console.log(json))
        .then(json => toUserIdPage(json))
        .catch(error => {alert("Barcode not recognised")});
}

function toUserIdPage(user) {
    sessionStorage.setItem('userId', user.id);

    //const comfirmedID = user.id; 
    window.location.href = "./usersPage.html";

}

function status(res) {
    if (!res.ok) {
        return Promise.reject()
    }
    return res;
}