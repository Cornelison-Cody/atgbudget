function buildHomeScreen() {
    let mainDiv        = document.getElementById("mainContent");
    let headerDiv      = document.createElement("header");
    let headerTitleDiv = document.createElement("h1");
    let headerSubDiv   = document.createElement("h3");
    let contentDiv     = document.createElement("content");
    let videoDiv       = document.createElement("video");
    let ctaTitleDiv    = document.createElement("h1");
    let overlayDiv     = document.createElement("overlay");
    let authDiv        = document.createElement("auth");
    let authContainer  = document.createElement("div");
    let footerDiv      = document.createElement("footer");
    let footerTitleDiv = document.createElement("h2");
    let footerTextDiv  = document.createElement("p");

    headerTitleDiv.innerText = "Save a Penny";
    headerSubDiv.innerText   = "A Simpler Way to Budget";

    videoDiv.setAttribute("src", "images/background.mp4");
    videoDiv.setAttribute("autoplay", "");
    videoDiv.setAttribute("muted", "");
    videoDiv.setAttribute("loop", "");
    videoDiv.setAttribute("poster", "images/screenshot.png");

    ctaTitleDiv.innerText = "Start saving today";

    authDiv.setAttribute("id", "firebaseAuthHolder");
    authContainer.setAttribute("id", "firebaseui-auth-container");

    footerTitleDiv.innerText = "Explanation Area";
    footerTextDiv.innerText  = "Story/history/instructions";

    authDiv.appendChild(authContainer);

    overlayDiv.appendChild(ctaTitleDiv);
    overlayDiv.appendChild(authDiv);

    headerDiv.appendChild(headerTitleDiv);
    headerDiv.appendChild(headerSubDiv);

    contentDiv.appendChild(videoDiv);
    contentDiv.appendChild(overlayDiv);

    footerDiv.appendChild(footerTitleDiv);
    footerDiv.appendChild(footerTextDiv);

    mainDiv.appendChild(headerDiv);
    mainDiv.appendChild(contentDiv);
    mainDiv.appendChild(footerDiv);

    launchUI();
}

function buildSidebar(displayName) {
    let mainDiv    = document.getElementById("mainContent");
    let sidebarDiv = document.createElement("sideBar");
    let bodyDiv    = document.body;

    sidebarDiv.appendChild(buildSideBarHeader());
    sidebarDiv.appendChild(buildActions());
    sidebarDiv.appendChild(buildSideBarFooter(displayName));

    bodyDiv.insertBefore(sidebarDiv, bodyDiv.childNodes[0]);

    mainDiv.style.marginLeft = "256px";
}

function buildSideBarHeader() {
    let headerDiv  = document.createElement("header");
    let logoDiv    = document.createElement("div");
    let titleDiv   = document.createElement("h2");

    titleDiv.innerText = "Save a Penny";
    logoDiv.classList.add("logoImage");

    headerDiv.appendChild(logoDiv);
    headerDiv.appendChild(titleDiv);

    return headerDiv;
}

function buildActions() {
    let actionsDiv = document.createElement("actions");

    actionsDiv.appendChild(buildActionHeader("Items"));
    actionsDiv.appendChild(buildActionItem("View Items", "fa-folder-open", "Items", "viewItems();"));
    actionsDiv.appendChild(buildActionItem("Add Item", "fa-file-alt", "Items", "popupAddItem();"));

    actionsDiv.appendChild(buildActionHeader("Expenses"));
    actionsDiv.appendChild(buildActionItem("View Expenses", "fa-folder-open", "Expenses", "viewExpenses();"));
    actionsDiv.appendChild(buildActionItem("Add Expense", "fa-dollar-sign", "Expenses", "popupAddExpense();"));

    actionsDiv.appendChild(buildActionHeader("Income"));
    actionsDiv.appendChild(buildActionItem("View Income", "fa-folder-open", "Income", "viewIncome();"));
    actionsDiv.appendChild(buildActionItem("Add Income", "fa-money-check", "Income", "addIncome();"));

    return actionsDiv;

}

function buildActionHeader(group) {
    let actionDiv = document.createElement("action");
    let titleDiv  = document.createElement("h2");
    let iconDiv   = document.createElement("i");

    actionDiv.classList.add("actionsHeader");
    actionDiv.setAttribute("onclick", "toggleActionChildren(\'" + group + "\', this);");

    titleDiv.innerText = group;

    iconDiv.classList.add("fas");
    iconDiv.classList.add("fa-caret-down");

    actionDiv.appendChild(titleDiv);
    actionDiv.appendChild(iconDiv);

    return actionDiv;
}

function buildActionItem(title, icon, group, action) {
    let actionDiv = document.createElement("action");
    let iconDiv   = document.createElement("i");
    let titleDiv  = document.createElement("h3");

    actionDiv.classList.add(group);
    actionDiv.classList.add("actionItem");

    iconDiv.classList.add("fas");
    iconDiv.classList.add(icon);

    titleDiv.innerText = title;

    actionDiv.setAttribute("onclick", action)

    actionDiv.appendChild(iconDiv);
    actionDiv.appendChild(titleDiv);

    return actionDiv;
}

function buildSideBarFooter(displayName) {
    let footerDiv  = document.createElement("footer");
    let statusDiv  = document.createElement("status");
    let signOutDiv = document.createElement("signOut");

    statusDiv.innerText  = displayName;
    signOutDiv.innerText = "Sign Out";

    signOutDiv.setAttribute("onclick", "signOut();");

    footerDiv.appendChild(statusDiv);
    footerDiv.appendChild(signOutDiv);

    return footerDiv;
}

function clearSideBar() {
    let mainDiv    = document.getElementById("mainContent");
    let sideBarDiv = document.getElementsByTagName("sideBar");

    if (sideBarDiv[0]) {
        document.body.removeChild(sideBarDiv[0]);
    }

    mainDiv.style.marginLeft = "0px";
}

function viewItems() {
    clearMainContent();

    let mainDiv        = document.getElementById('mainContent');
    let HeaderDiv      = document.createElement("header");
    let HeaderTitleDiv = document.createElement("h1");
    let ContentDiv     = document.createElement("content");
    let FooterDiv      = document.createElement("footer");
    let FooterButton   = document.createElement("button");

    HeaderTitleDiv.innerText = localStorage.getItem("name") + "'s Budget Items";
    FooterButton.innerText   = "Add Item";
    FooterButton.setAttribute("onclick", "popupAddItem()");

    ContentDiv.classList.add("spacing-top");

    HeaderDiv.appendChild(HeaderTitleDiv);
    FooterDiv.appendChild(FooterButton);

    let myItems;

    try {
        myItems = getItems();
    }
    catch(err) {
    }

    if(myItems){
        for (let i = 0; i < myItems.length; i++) {
            ContentDiv.appendChild(buildBudgetItem(myItems[i].name, myItems[i].balance));
        }
    }

    mainDiv.appendChild(HeaderDiv);
    mainDiv.appendChild(ContentDiv);
    mainDiv.appendChild(FooterDiv);
}

function viewExpenses() {
    clearMainContent();

    let mainDiv        = document.getElementById('mainContent');
    let HeaderDiv      = document.createElement("header");
    let HeaderTitleDiv = document.createElement("h1");
    let ContentDiv     = document.createElement("content");
    let expensesDiv    = document.createElement("expenses");
    let FooterDiv      = document.createElement("footer");
    let FooterButton   = document.createElement("button");

    HeaderTitleDiv.innerText = localStorage.getItem("name") + "'s Expenses";
    FooterButton.innerText   = "Add Expense";
    FooterButton.setAttribute("onclick", "popupAddExpense('')");

    HeaderDiv.appendChild(HeaderTitleDiv);
    FooterDiv.appendChild(FooterButton);

    ContentDiv.classList.add("spacing-top");

    let tableHeader = buildExpenseRow("Item", "Date", "Amount", "Description");
    tableHeader.setAttribute("id","expenseHeader");

    expensesDiv.appendChild(tableHeader);

    let myItems;

    try {
        myItems = getExpenses();
    }
    catch(err) {
    }

    if(myItems){
        for (let i = 0; i < myItems.length; i++) {
            expensesDiv.appendChild(buildExpenseRow(myItems[i].name, myItems[i].date, myItems[i].amount, myItems[i].description));
        }
    }

    ContentDiv.appendChild(expensesDiv);

    mainDiv.appendChild(HeaderDiv);
    mainDiv.appendChild(ContentDiv);
    mainDiv.appendChild(FooterDiv);
}

function buildExpenseRow(name, date, amount, description) {
    let rowDiv         = document.createElement("row");
    let nameDiv        = document.createElement("div");
    let dateDiv        = document.createElement("div");
    let amountDiv      = document.createElement("div");
    let descriptionDiv = document.createElement("div");

    nameDiv.innerText        = name;
    dateDiv.innerText        = date;
    amountDiv.innerText      = amount;
    descriptionDiv.innerText = description;

    rowDiv.appendChild(nameDiv);
    rowDiv.appendChild(dateDiv);
    rowDiv.appendChild(amountDiv);
    rowDiv.appendChild(descriptionDiv);

    return rowDiv;
}

function buildBudgetItem(name, amount) {
    let itemDiv    = document.createElement("item");
    let NameDiv    = document.createElement("h2");
    let BalanceDiv = document.createElement("h3");

    NameDiv.innerText    = name;
    BalanceDiv.innerText = amount;

    itemDiv.appendChild(NameDiv);
    itemDiv.appendChild(BalanceDiv);

    itemDiv.setAttribute("onclick", "popupAddExpense('" + name + "')");
    itemDiv.setAttribute("id", name);

    return itemDiv;
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
    buttonDiv.setAttribute("onclick", "submitNewExpense('" + itemName +  "', document.getElementById('amount').value, document.getElementById('description').value)");

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

        buttonDiv.setAttribute("onclick", "submitNewExpense(document.getElementById('itemName').value, document.getElementById('amount').value, document.getElementById('description').value)");
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


function hidePopup() {
    let mainDiv   = document.getElementById("mainContent");
    let popupDivs = document.getElementsByTagName("popup");

    if (popupDivs[0]) {
        mainDiv.removeAttribute("onclick");
        while (popupDivs[0]) {
            mainDiv.removeChild(popupDivs[0]);
        }
    }
}

function popupAddItem() {
    blurChildren("mainContent");
    showAddItem();
}

function popupAddExpense(itemName) {
    blurChildren("mainContent");
    showAddExpense(itemName);
}

function cancelPopup() {
    let mainDiv = document.getElementsByTagName("mainContent");
    if (event.srcElement === mainDiv[0] || event.srcElement === mainDiv[0].childNodes[0] ||
        event.srcElement === mainDiv[0].childNodes[1] || event.srcElement === mainDiv[0].childNodes[2] ) {
        hidePopup();
        unBlurChildren("mainContent");
    }
}

function submitNewItem(name) {
    hidePopup();
    addItem(name);
    unBlurChildren("mainContent");

    let contentDivs = document.getElementsByTagName("content");
    contentDivs[0].appendChild(buildBudgetItem(name, 0));
}

function submitNewExpense(name, amount, description) {
    hidePopup();
    addExpense(name, amount, description);
    unBlurChildren("mainContent");

    let today = new Date();
    let expenseTable = document.getElementsByTagName("expenses");
    expenseTable[0].appendChild(buildExpenseRow(name, today.toDateString(), amount, description));
}

function clearMainContent() {
    let mainDiv = document.getElementById('mainContent');

    let childrenArray = Array.from(mainDiv.childNodes);
    childrenArray.forEach(function (childDiv) {
        childDiv.parentNode.removeChild(childDiv);
    })
}

function blurChildren(elementID) {
    let div  = document.getElementById(elementID);
    let divs = div.childNodes;
    for (let i = 0; i < divs.length; i++) {
        divs[i].style.filter = "blur(2px)";
    }
}

function unBlurChildren(elementID) {
    let div  = document.getElementById(elementID);
    let divs = div.childNodes;
    for (let i = 0; i < divs.length; i++) {
        divs[i].style.filter = "blur(0px)";
    }
}