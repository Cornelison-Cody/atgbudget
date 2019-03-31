var exports = module.exports;

const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore({
    projectId:   'atgbudget-710c0',
    keyFilename: 'atgbudget-c99491099a34.json'
});

exports.addExpense = function(uid, itemName, expenseAmount, expenseDescription, res) {
    let today = new Date();
    firestore.collection('budgets/' + uid + '/expenses')
        .add({
        name: itemName,
        category: '',
        amount: expenseAmount,
        description: expenseDescription,
        date: today.toDateString(),
        active: true
    });

    const itemDoc = firestore.doc('budgets/' + uid + '/items/' +itemName);
    itemDoc.get().then(docSnapshot => {
        if(docSnapshot.exists) {
            let itemData = docSnapshot.data();
            let itemBalance = itemData.balance;
            let itemCategory = itemData.category;

            itemDoc.set({
                name: itemName,
                category: itemCategory,
                balance: itemBalance - expenseAmount,
                active: true
            });
        }

        const documentTotal = firestore.doc('budgets/' + uid + '/items/budgetTotal');
        documentTotal.get().then( doc => {
            if(doc.exists) {
                let budgetTotal  = doc.data();
                let budgetAmount = budgetTotal.amount;

                documentTotal.set({
                    amount: budgetAmount - expenseAmount
                });
            }
            else {
                documentTotal.set({
                    amount: 0 - expenseAmount
                })
            }
        });
    });
    res.writeHead(200, {"Content-type": "application/json"});
    res.write(JSON.stringify({result: itemName + " expense successful"}));
    res.end();
};

exports.getExpenses = function(uid, res) {
    let userData = [];
    const userDocs = firestore.collection('budgets/' + uid + '/expenses');
    let query = userDocs.where('active', '==', true).orderBy("date", "desc").get()
        .then(snapshot => {
            if (snapshot.empty) {
                res.writeHead(404, {"Content-type": "application/text"});
                res.write("No items found");
                res.end();
                return;
            }

            snapshot.forEach(doc => {
                userData.push(doc.data());

            });
            res.writeHead(200, {"Content-type": "application/json"});
            res.write(JSON.stringify(userData));
            res.end();
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
};

exports.addItem = function(uid, itemName, itemAmount, res) {
    const document = firestore.doc('budgets/' + uid + '/items/' +itemName);
    document.get().then(docSnapshot => {
        if(!docSnapshot.exists) {
            document.set({
                name: itemName,
                category: '',
                balance: itemAmount,
                active: true
            });
            const documentTotal = firestore.doc('budgets/' + uid + '/items/budgetTotal');
            documentTotal.get().then( doc => {
                if(doc.exists) {
                    let budgetTotal  = doc.data();
                    let budgetAmount = budgetTotal.amount;

                    documentTotal.set({
                        amount: budgetAmount + itemAmount
                    });
                }
                else {
                    documentTotal.set({
                        amount: 0
                    })
                }
            });
        }
    });
    res.writeHead(200, {"Content-type": "application/json"});
    res.write(JSON.stringify({result: itemName + " added successfully"}));
    res.end();
};

exports.getItem = function(uid, itemName, res) {
    const document = firestore.doc('budgets/' + uid + '/items/' +itemName);
    let getDoc = document.get()
        .then(doc => {
            if (!doc.exists) {
                res.writeHead(404, {"Content-type": "application/text"});
                res.write("Item not found");
                res.end();
            } else {
                res.writeHead(200, {"Content-type": "application/json"});
                res.write(JSON.stringify(doc.data()));
                res.end();
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });
};

exports.getItems = function(uid, res) {
    let userData = [];
    const userDocs = firestore.collection('budgets/' + uid + '/items');
    let query = userDocs.where('active', '==', true).get()
        .then(snapshot => {
            if (snapshot.empty) {
                res.writeHead(404, {"Content-type": "application/text"});
                res.write("No items found");
                res.end();
                return;
            }

            snapshot.forEach(doc => {
                userData.push(doc.data());

            });
            res.writeHead(200, {"Content-type": "application/json"});
            res.write(JSON.stringify(userData));
            res.end();
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
};

exports.addIncome = function(uid, incomeAmount, itemArray, res) {
    let today = new Date();
    let batchID;
    firestore.collection('budgets/' + uid + '/incomeBatches')
        .add({
            amount: incomeAmount,
            date: today.toDateString(),
            active: true
        }).then(ref => {
            batchID = ref.id;
    });

    const documentTotal = firestore.doc('budgets/' + uid + '/items/budgetTotal');
    documentTotal.get().then( doc => {
        if(doc.exists) {
            let budgetTotal  = doc.data();
            let budgetAmount = budgetTotal.amount;

            documentTotal.set({
                amount: budgetAmount + incomeAmount
            });
        }
        else {
            documentTotal.set({
                amount: incomeAmount
            })
        }
    });

    for (let item = 0; item < itemArray.length; item++) {
        addIncomeItem(uid, itemArray[item].name, itemArray[item].itemIncome, batchID, res);
    }

    res.writeHead(200, {"Content-type": "application/json"});
    res.write(JSON.stringify({result: batchID + " was successful"}));
    res.end();
};

exports.addIncomeItem = function(uid, itemName, incomeAmount, batch, res) {
    let today = new Date();
    firestore.collection('budgets/' + uid + '/income')
        .add({
            name: itemName,
            amount: incomeAmount,
            date: today.toDateString(),
            batch: batch,
            active: true
        });

    const itemDoc = firestore.doc('budgets/' + uid + '/items/' +itemName);
    itemDoc.get().then(docSnapshot => {
        if(docSnapshot.exists) {
            let itemData = docSnapshot.data();
            let itemBalance = itemData.balance;

            itemDoc.set({
                name: itemName,
                balance: itemBalance + incomeAmount,
                active: true
            });
        }
    });

    res.writeHead(200, {"Content-type": "application/json"});
    res.write(JSON.stringify({result: itemName + " income successful"}));
    res.end();
};

exports.getIncomeItems = function(uid, batch, res) {
    let userData = [];
    const userDocs = firestore.collection('budgets/' + uid + '/income');
    let query = userDocs.where('batch', '==', batch)
        .where('active', '==', true).get()
        .then(snapshot => {
            if (snapshot.empty) {
                res.writeHead(404, {"Content-type": "application/text"});
                res.write("No items found");
                res.end();
                return;
            }

            snapshot.forEach(doc => {
                userData.push(doc.data());

            });
            res.writeHead(200, {"Content-type": "application/json"});
            res.write(JSON.stringify(userData));
            res.end();
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
};

exports.getIncomeBatches = function(uid, res) {
    let userData = [];
    const userDocs = firestore.collection('budgets/' + uid + '/incomeBatches');
    let query = userDocs.where('active', '==', true).get()
        .then(snapshot => {
            if (snapshot.empty) {
                res.writeHead(404, {"Content-type": "application/text"});
                res.write("No items found");
                res.end();
                return;
            }

            snapshot.forEach(doc => {
                userData.push(doc.data());

            });
            res.writeHead(200, {"Content-type": "application/json"});
            res.write(JSON.stringify(userData));
            res.end();
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
};