/****************************
      Expense Popups
 ****************************/
function popupAddExpense(itemName) {
    blurChildren("mainContent");
    showAddExpense(itemName);
}

function showAddExpense(itemName) {
    let mainDiv    = document.getElementById("mainContent");
    let popupDiv   = document.createElement("popup");
    let headerDiv  = document.createElement("header");
    let titleDiv   = document.createElement("h2");
    let contentDiv = document.createElement("content");
    let inputDiv1  = document.createElement("input");
    let inputDiv2  = document.createElement("input");
    let buttonDiv  = document.createElement("button");
    let buttonDiv2 = document.createElement("button");

    titleDiv.innerText  = "Add a New Expense";
    buttonDiv.innerText = "Add Expense";
    buttonDiv2.innerText = "Add Expense";

    inputDiv1.setAttribute("type", "text");
    inputDiv1.setAttribute("id", "description");
    inputDiv1.setAttribute("placeholder", "Expense Description");
    inputDiv1.setAttribute("value", "");

    inputDiv2.setAttribute("type", "text");
    inputDiv2.setAttribute("id", "amount");
    inputDiv2.setAttribute("placeholder", "Expense Amount");

    buttonDiv.setAttribute("type", "button");
    buttonDiv.setAttribute("onclick", "submitNewExpense('" + itemName +  "', document.getElementById('amount').value, document.getElementById('description').value), false");

    buttonDiv2.setAttribute("style", "visibility: hidden;");

    if(!itemName) {
        let inputDiv3  = document.createElement("select");
        let buttonDiv3 = document.createElement("button");

        inputDiv3.setAttribute("name", "itemName");
        inputDiv3.setAttribute("id", "itemName");

        let myItems;

        try {
            myItems = getItems();
        }
        catch(err) {
        }

        if(myItems){
            for (let i = 0; i < myItems.length; i++) {
                let itemOption = document.createElement("option");

                itemOption.setAttribute("value", myItems[i].name);
                itemOption.innerText = myItems[i].name;

                inputDiv3.appendChild(itemOption);
            }
        }

        buttonDiv3.innerText = "Add Expense";
        buttonDiv3.setAttribute("style", "visibility: hidden;");

        contentDiv.appendChild(inputDiv3);
        contentDiv.appendChild(buttonDiv3);

        buttonDiv.setAttribute("onclick", "submitNewExpense(document.getElementById('itemName').value, document.getElementById('amount').value, document.getElementById('description').value), true");
    }

    headerDiv.appendChild(titleDiv);
    contentDiv.appendChild(inputDiv1);
    contentDiv.appendChild(buttonDiv2);
    contentDiv.appendChild(inputDiv2);
    contentDiv.appendChild(buttonDiv);

    popupDiv.appendChild(headerDiv);
    popupDiv.appendChild(contentDiv);

    mainDiv.appendChild(popupDiv);
    mainDiv.setAttribute("onclick", "cancelPopup()");
}

/****************************
         Item Popups
 ****************************/
function popupAddItem() {
    blurChildren("mainContent");
    showAddItem();
}

function showAddItem() {
    let mainDiv    = document.getElementById("mainContent");
    let popupDiv   = document.createElement("popup");
    let headerDiv  = document.createElement("header");
    let titleDiv   = document.createElement("h2");
    let contentDiv = document.createElement("content");
    let inputDiv   = document.createElement("input");
    let buttonDiv  = document.createElement("button");

    titleDiv.innerText  = "Add a New Item";
    buttonDiv.innerText = "Add Item";

    inputDiv.setAttribute("type", "text");
    inputDiv.setAttribute("id", "name");
    inputDiv.setAttribute("placeholder", "Item Title");

    buttonDiv.setAttribute("type", "button");
    buttonDiv.setAttribute("onclick", "submitNewItem(document.getElementById('name').value)");

    headerDiv.appendChild(titleDiv);
    contentDiv.appendChild(inputDiv);
    contentDiv.appendChild(buttonDiv);

    popupDiv.appendChild(headerDiv);
    popupDiv.appendChild(contentDiv);

    mainDiv.appendChild(popupDiv);
    mainDiv.setAttribute("onclick", "cancelPopup()");
}