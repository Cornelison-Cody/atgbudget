function signOut() {
    firebase.auth().signOut().then(function() {
        recreateSignIn();
        launchUI();
    }, function(error) {
        console.error('Sign Out Error', error);
    });
}

function recreateSignIn() {
    let signInDivParent = document.getElementById('firebaseAuthHolder');
    let signInDiv = document.getElementById('firebaseui-auth-container');
    signInDivParent.removeChild(signInDiv);

    let newSignInDiv = document.createElement("div");
    newSignInDiv.setAttribute("id", "firebaseui-auth-container");
    signInDivParent.appendChild(newSignInDiv);
}

function toggleChildren(element) {
    // need to write function to hide actions in side menu bar
}

function showAddItem() {

}

function viewItems() {
    clearMainContent();

    let mainDiv            = document.getElementById('mainContent');
    let itemHeaderDiv      = document.createElement("header");
    let itemHeaderTitleDiv = document.createElement("h1");
    let itemFooterDiv      = document.createElement("footer");
    let itemFooterButton   = document.createElement("button");

    itemHeaderTitleDiv.innerText = localStorage.getItem("name") + "'s Budget Items";
    itemFooterButton.innerText   = "Add Item";
    itemFooterButton.setAttribute("onclick", "showAddItem()");

    itemHeaderDiv.appendChild(itemHeaderTitleDiv);
    itemFooterDiv.appendChild(itemFooterButton);

    let itemContentDiv = document.createElement("content");
    let myItems = getItems();

    for (let i = 0; i < myItems.length; i++) {
        let itemDiv        = document.createElement("item");
        let itemNameDiv    = document.createElement("h2");
        let itemBalanceDiv = document.createElement("h3");

        itemNameDiv.innerText    = myItems[i].name;
        itemBalanceDiv.innerText = myItems[i].balance.toString();

        itemDiv.appendChild(itemNameDiv);
        itemDiv.appendChild(itemBalanceDiv);

        itemContentDiv.appendChild(itemDiv);
    }

    mainDiv.appendChild(itemHeaderDiv);
    mainDiv.appendChild(itemContentDiv);
    mainDiv.appendChild(itemFooterDiv);
}

function clearMainContent() {
    let mainDiv = document.getElementById('mainContent');

    let childrenArray = Array.from(mainDiv.childNodes);
    childrenArray.forEach(function (childDiv) {
        childDiv.parentNode.removeChild(childDiv);
    })
}

function getItems() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/budget/items?uid=" + localStorage.getItem("uid"), false);
    xhttp.send(null);
    return JSON.parse(xhttp.responseText);
}

// function getItem() {
//     const xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             document.getElementById("person").innerHTML = this.responseText;
//         }
//     };
//     xhttp.open("GET", "/services/getPerson?id=" + document.getElementById('id').value, true);
//     xhttp.send();
// }