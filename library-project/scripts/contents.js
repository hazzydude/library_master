let searchName = document.getElementById("inputSearchName");
let main = document.getElementById("main");

//todo - search by type. ignore case on search. combine filters, search by name is "like", delete previous search items



function toIndex() {
    window.location.href = "./index.html";
}

function createStore() {
    if (document.body.contains(document.getElementById('store'))) {
        document.getElementById('store').parentNode.removeChild(document.getElementById('store'));
    }
    let store = document.createElement("div")
    store.id = "store";
    main.appendChild(store);
}

function searchAll() {
    createStore();
    fetch("http://localhost:8080/item/All")
        .then(res => res.json())
        .then(json => displayAll(json))
        ;
}
    
function displayAll(data) {
    for (let item of data) {
        displayItem(item);
    }
}

function search() {
    createStore();


    fetch("http://localhost:8080/item/byname/" + searchName.value)
        .then(status)
        .then(res => res.json())
        .then(json => displayItem(json))
        .catch(error => {alert("No items found with Name: " + searchName.value)});

}

function status(res) {
    if (!res.ok) {
        return Promise.reject()
    }
    return res;
}

function displayItem(item) {



    let newItem = document.createElement("div");
    newItem.className = "card mb-3"
    let container = document.createElement("div");
    container.className = "row no-gutters";
    newItem.appendChild(container);

    let imgStore = document.createElement("div");
    imgStore.className = "col-md-6";
    container.appendChild(imgStore);

    let poster = document.createElement("img");
    poster.className = "card-image imageRes";
    if (item.imagelink) {
        poster.src = item.fullImageLink;
    } else {
        poster.src = './static/images/ImageNotFound.png';
    }
    poster.height = 300;

    imgStore.appendChild(poster);

    let bodyStore = document.createElement("div");
    bodyStore.className = "col-md-6";
    container.appendChild(bodyStore);

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";
    bodyStore.appendChild(cardBody);

    let title = document.createElement("h1");
    title.className = "card-title";
    title.innerText = item.name;
    cardBody.appendChild(title);

    let info = document.createElement("p");
    info.className = "card-text"
    info.innerText = "Format: " + item.type + "\n" + "Author: " + item.author + "\n" + "Stock Level: " + item.stockLevel;
    cardBody.appendChild(info);

    store.appendChild(newItem);

}