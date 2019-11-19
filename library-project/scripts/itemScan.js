
let itemId = document.getElementById("scannedCode");
const checkInOROut = sessionStorage.getItem('checkInOROut');
const userId = sessionStorage.getItem('userId');
let main = document.getElementById("main");
let SL = null;

function addComment() {
    let comment = document.createElement("p");
    if (checkInOROut == 1) {
        comment.innerText = "Please Scan to complete checkout";
    } else if (checkInOROut == 0) {
        comment.innerText = "Please Scan to return item";
    }
    main.appendChild(comment);
}

function toIndex() {
    window.location.href = "./index.html";
}

function dealWithItem() {

    fetch("http://localhost:8080/item/" + itemId.value)
        .then(status)
        .then(res => res.json())
        .then(json => stockLevelgetter(json))
        .then(() => {
            if (checkInOROut == 1) {

                checkOut();
                SL = SL - 1;
                setStockLevel();
            } else if (checkInOROut == 0) {
                checkIn();
                SL = SL + 1;
                setStockLevel();
            } else {

                window.location.href = "./usersPage.html";
                alert("An error occoured")
            }
        })
        .catch(error => {alert("Barcode not recognised")});
}

function checkOut() {

    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    //must change userId_
    fetch("http://localhost:8080/user_item", {
        method: 'POST',
        body: JSON.stringify({
            "dateCheckedOut": "2019-11-10",
            "itemId": itemId.value,
            "userId": userId,
            "dateCheckedOut": date
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(responceCheck());
}

function checkIn() {
    fetch("http://localhost:8080/user_item/" + itemId.value + "/" + userId, {
        method: 'DELETE',

        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(responceCheck());
}

function responceCheck() {
    window.location.href = "./usersPage.html";
}

function stockLevelgetter(data) {
    SL = data.stockLevel;
    console.log("recived stock level: " + SL);
}

function setStockLevel() {


    fetch("http://localhost:8080/item/" + itemId.value, {
        method: 'POST',
        body: JSON.stringify({
            "stockLevel": SL
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

}

function status(res) {
    if (!res.ok) {
        return Promise.reject()
    }
    return res;
}