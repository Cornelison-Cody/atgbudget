/****************************
      Home Page Functions
 ****************************/
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

function clearMainContent() {
    let mainDiv = document.getElementById('mainContent');

    let childrenArray = Array.from(mainDiv.childNodes);
    childrenArray.forEach(function (childDiv) {
        childDiv.parentNode.removeChild(childDiv);
    })
}

/****************************
      Side Bar Functions
 ****************************/
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
    actionsDiv.appendChild(buildActionItem("Add Income", "fa-money-check", "Income", "popupAddIncome();"));

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

/****************************
       Expense Functions
 ****************************/
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

function submitNewExpense(name, amount, description, fromExpense) {
    hidePopup();
    addExpense(name, amount, description);
    unBlurChildren("mainContent");
    if (fromExpense) {
        let today = new Date();
        let expenseTable = document.getElementsByTagName("expenses");
        expenseTable[0].appendChild(buildExpenseRow(name, today.toDateString(), amount, description));
    }
    else {
        let item = document.getElementById(name);
        item.childNodes[1].innerText -= amount;
    }
}

/****************************
        Item Functions
 ****************************/
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

function submitNewItem(name) {
    hidePopup();
    addItem(name);
    unBlurChildren("mainContent");

    let contentDivs = document.getElementsByTagName("content");
    contentDivs[0].appendChild(buildBudgetItem(name, 0));
}

/****************************
    Income Functions
 ****************************/
function buildIncomeRow(name, date, amount, description) {
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

function submitNewIncome(name, amount, description, fromExpense) {
    hidePopup();
    addExpense(name, amount, description);
    unBlurChildren("mainContent");
    if (fromExpense) {
        let today = new Date();
        let expenseTable = document.getElementsByTagName("expenses");
        expenseTable[0].appendChild(buildExpenseRow(name, today.toDateString(), amount, description));
    }
    else {
        let item = document.getElementById(name);
        item.childNodes[1].innerText -= amount;
    }
}

/****************************
       Popup Functions
 ****************************/
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

function cancelPopup() {
    let mainDiv = document.getElementsByTagName("mainContent");
    if (event.srcElement === mainDiv[0] || event.srcElement === mainDiv[0].childNodes[0] ||
        event.srcElement === mainDiv[0].childNodes[1] || event.srcElement === mainDiv[0].childNodes[2] ) {
        hidePopup();
        unBlurChildren("mainContent");
    }
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