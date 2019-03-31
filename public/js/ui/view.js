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

function viewIncome() {
    clearMainContent();

    let mainDiv        = document.getElementById('mainContent');
    let HeaderDiv      = document.createElement("header");
    let HeaderTitleDiv = document.createElement("h1");
    let ContentDiv     = document.createElement("content");
    let incomeDiv      = document.createElement("income");
    let FooterDiv      = document.createElement("footer");
    let FooterButton   = document.createElement("button");

    HeaderTitleDiv.innerText = localStorage.getItem("name") + "'s Income";
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