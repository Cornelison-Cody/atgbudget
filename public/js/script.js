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

function showAddItem() {

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