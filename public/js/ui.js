function buildHomeScreen() {
    let mainDiv        = document.getElementById("mainContent");
    let headerDiv      = document.createElement("header");
    let headerTitleDiv = document.createElement("h1");
    let headerSubDiv   = document.createElement("h3");
    let contentDiv     = document.createElement("content");
    let contentImgDiv  = document.createElement("img");
    let footerDiv      = document.createElement("footer");
    let footerTitleDiv = document.createElement("h3");
    let footerTextDiv  = document.createElement("p");
    let footerAuthDiv  = document.createElement("div");
    let footerAuthCont = document.createElement("div");

    headerTitleDiv.innerText = "Welcome to Save a Penny!";
    headerSubDiv.innerText   = "~A Simpler Way to Budget";

    contentImgDiv.setAttribute("src", "images/screenshot.png");

    footerTitleDiv.innerText = "Get Started/Explanation Area";
    footerTextDiv.innerText  = "Sign in to start"

    footerAuthDiv.setAttribute("id", "firebaseAuthHolder");
    footerAuthCont.setAttribute("id", "firebaseui-auth-container");

    footerAuthDiv.appendChild(footerAuthCont);

    headerDiv.appendChild(headerTitleDiv);
    headerDiv.appendChild(headerSubDiv);

    contentDiv.appendChild(contentImgDiv);

    footerDiv.appendChild(footerTitleDiv);
    footerDiv.appendChild(footerTextDiv);
    footerDiv.appendChild(footerAuthDiv);

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

    actionsDiv.appendChild(buildActionHeader("Budget"));
    actionsDiv.appendChild(buildActionItem("Expenses", "fa-dollar-sign", "Budget"));
    actionsDiv.appendChild(buildActionItem("Income", "fa-money-check", "Budget"));
    actionsDiv.appendChild(buildActionItem("Items", "fa-file-alt", "Budget"));
    actionsDiv.appendChild(buildActionItem("Reports", "fa-file-invoice-dollar", "Budget"));

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

function buildActionItem(title, icon, group) {
    let actionDiv = document.createElement("action");
    let iconDiv   = document.createElement("i");
    let titleDiv  = document.createElement("h3");

    actionDiv.classList.add(group);

    iconDiv.classList.add("fas");
    iconDiv.classList.add(icon);

    titleDiv.innerText = title;

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
    let FooterDiv      = document.createElement("footer");
    let FooterButton   = document.createElement("button");

    HeaderTitleDiv.innerText = localStorage.getItem("name") + "'s Budget Items";
    FooterButton.innerText   = "Add Item";
    FooterButton.setAttribute("onclick", "showAddItem()");

    HeaderDiv.appendChild(HeaderTitleDiv);
    FooterDiv.appendChild(FooterButton);

    let ContentDiv = document.createElement("content");
    let myItems    = getItems();

    for (let i = 0; i < myItems.length; i++) {
        let itemDiv    = document.createElement("item");
        let NameDiv    = document.createElement("h2");
        let BalanceDiv = document.createElement("h3");

        NameDiv.innerText    = myItems[i].name;
        BalanceDiv.innerText = myItems[i].balance.toString();

        itemDiv.appendChild(NameDiv);
        itemDiv.appendChild(BalanceDiv);

        ContentDiv.appendChild(itemDiv);
    }

    mainDiv.appendChild(HeaderDiv);
    mainDiv.appendChild(ContentDiv);
    mainDiv.appendChild(FooterDiv);
}

function clearMainContent() {
    let mainDiv = document.getElementById('mainContent');

    let childrenArray = Array.from(mainDiv.childNodes);
    childrenArray.forEach(function (childDiv) {
        childDiv.parentNode.removeChild(childDiv);
    })
}