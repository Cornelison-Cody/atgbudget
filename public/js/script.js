function signOut() {
    firebase.auth().signOut().then(function() {
        initApp();
    }, function(error) {
        console.error('Sign Out Error', error);
    });
}

function toggleActionChildren(toggleClass, element) {

    if (element.lastElementChild.classList.contains("fa-caret-down")) {
        element.lastElementChild.classList.add("fa-caret-up");
    }
    else {
        element.lastElementChild.classList.add("fa-caret-down");
    }

    let children = document.getElementsByClassName(toggleClass);

    for(let i = 0; i < children.length; i++) {
        if (children[i].style.display === "flex") {
            children[i].style.display = "none";
        }
        else {
            children[i].style.display = "flex";
        }
    }
}

function updateRemainingIncome(amount) {
    let remainingAmount = document.getElementById("incomeRemaining");
    let currentAmount   = parseInt(remainingAmount.innerText, 10);

    remainingAmount.innerText = currentAmount + amount;
}

function addExpense(name, amount, description) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/budget/items", true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send( JSON.stringify({
        uid: localStorage.getItem("uid"),
        function: "addExpense",
        name: name,
        amount: Number(amount),
        description: description
    }));
    return xhttp.responseText;
}

function getExpenses() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/budget/items?function=getExpenses&uid=" + localStorage.getItem("uid"), false);
    xhttp.send(null);
    return JSON.parse(xhttp.responseText);
}

function addItem(name) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/budget/items", true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify({
        uid: localStorage.getItem("uid"),
        function: "addItem",
        name: name,
        amount: 0
    }));
    return xhttp.responseText;
}

function getItems() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/budget/items?function=getItems&uid=" + localStorage.getItem("uid"), false);
    xhttp.send(null);
    return JSON.parse(xhttp.responseText);
}

function addIncome(amount, itemArray) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/budget/items", true);
    xhttp.send(JSON.stringify({
        uid: localStorage.getItem("uid"),
        function: "addIncome",
        amount: Number(amount),
        itemArray: itemArray
    }));
    return xhttp.responseText;
}

function getIncome() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/budget/items?function=getIncome&uid=" + localStorage.getItem("uid"), false);
    xhttp.send(null);
    return JSON.parse(xhttp.responseText);
}

