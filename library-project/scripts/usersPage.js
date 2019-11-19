
let main = document.getElementById("main");
const userId = sessionStorage.getItem('userId');

function toIndex() {
    sessionStorage.clear();
    window.location.href = "./index.html";
}


function loadUserPage() {

    fetch("http://localhost:8080/user_item/everything/" + userId)
        .then(res => res.json())
        //.then(json => console.log(json))
        .then(json => display(json));

}

function display(data) {

    let pageTitle = document.createElement("h1");
    pageTitle.innerText = data.name;
    main.appendChild(pageTitle);

    displayInfo(data);

    let itemContainer = document.createElement("div");
    itemContainer.className = "itemContainer";

    let buttonBar = document.createElement("div");
    buttonBar.className = "buttonBar";

    let checkedHeader = document.createElement("h2");
    checkedHeader.className = "barTitle";
    checkedHeader.innerText = "Checked items";
    buttonBar.appendChild(checkedHeader);



    let checkOutbutton = document.createElement("button");
    checkOutbutton.className = "col-md-4 btn btn-lg btn-primary btn-block buttonBarButton";
    checkOutbutton.innerText = "Check Out Item";
    checkOutbutton.addEventListener('click', () => { checkOutItem()});
    checkOutbutton.onclick = "checkOutItem();"
    buttonBar.appendChild(checkOutbutton);

    let checkInbutton = document.createElement("button");
    checkInbutton.className = "col-md-4 btn btn-lg btn-primary btn-block buttonBarButton";
    checkInbutton.innerText = "Return Item";
    checkInbutton.addEventListener('click', () => { returnItem()});
    checkInbutton.onclick = "returnItem();"
    buttonBar.appendChild(checkInbutton);
    itemContainer.appendChild(buttonBar);

    displayUserItems(data.items, itemContainer)
    main.appendChild(itemContainer);


}


function displayInfo(user) {

    let newUser = document.createElement("div");
    newUser.className = "card mb-3";
    let container = document.createElement("div");
    container.className = "row no-gutters";
    newUser.appendChild(container);

    let bodyStore = document.createElement("div");
    //bodyStore.className = "";
    container.appendChild(bodyStore);

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";
    bodyStore.appendChild(cardBody);

    let title = document.createElement("h2");
    title.className = "card-title";
    title.innerText = "Details";
    cardBody.appendChild(title);

    let info = document.createElement("p");
    info.className = "card-text";
    info.innerText = "Name: " + user.name + "\n" + "User id: " + user.id + "\n" + "Date of Birth: " + user.DoB + "\n";
    cardBody.appendChild(info);

    main.appendChild(newUser);
}

//user items could be an itarable json (array), singluar, or just "[]"
//if has [] is iterable??
function displayUserItems(userItems, itemContainer) {

    for (let item of userItems) {


        let newItem = document.createElement("div");
        newItem.className = "card mb-3"
        newItem.style = "width:90%;margin:auto"
        let container = document.createElement("div");
        container.className = "row no-gutters";
        newItem.appendChild(container);

        let imgStore = document.createElement("div");
        imgStore.className = "col-md-4";
        container.appendChild(imgStore);

        let poster = document.createElement("img");
        poster.className = "card-image smallImageRes";
        if (item.imagelink) {
            poster.src = item.fullImageLink;
        } else {
            //poster.src = './static/images/ImageNotFoung.png';
        }

        imgStore.appendChild(poster);

        let bodyStore = document.createElement("div");
        bodyStore.className = "col-md-6";
        container.appendChild(bodyStore);

        let cardBody = document.createElement("div");
        cardBody.className = "card-body";
        bodyStore.appendChild(cardBody);

        let title = document.createElement("h3");
        title.className = "card-title";
        title.innerText = item.name;
        cardBody.appendChild(title);

        let info = document.createElement("p");
        info.className = "card-text"
        info.innerText = "Format: " + item.type + "\n" + "Author: " + item.author + "\n"
            + "Date Taken out: " + item.user_item.dateCheckedOut + "\n" + "Return Date: " + item.user_item.returnDate
            ;
        cardBody.appendChild(info);

        itemContainer.appendChild(newItem);
    }
}

function checkOutItem() {
    sessionStorage.setItem('checkInOROut', 1);
    window.location.href = "./itemScan.html";
}

function returnItem() {
    sessionStorage.setItem('checkInOROut', 0);
    window.location.href = "./itemScan.html";
}

