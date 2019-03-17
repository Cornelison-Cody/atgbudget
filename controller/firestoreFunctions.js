var exports = module.exports;

const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore({
    projectId:   'atgbudget-710c0',
    keyFilename: 'atgbudget-c99491099a34.json'
});

exports.addItem = function(uid, itemName, res) {
    const document = firestore.doc('budgets/' + uid + '/items/' +itemName);
    document.set({
        name: itemName,
        category: '',
        balance: 0,
        active: true
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
    var userData = [];
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

// async function main() {
    // const document = firestore.doc('posts/intro-to-firestore');
    // console.log('Document created');
    //
    // // Enter new data into the document.
    // await document.set({
    //     title: 'Welcome to Firestore',
    //     body: 'Hello World',
    // });
    // console.log('Entered new data into the document');
    //
    // // Update an existing document.
    // await document.update({
    //     body: 'My first Firestore app',
    // });
    // console.log('Updated an existing document');
    //
    // // Read the document.
    // let doc = await document.get();
    // console.log('Read the document');
    //
    // // Delete the document.
    // await document.delete();
    // console.log('Deleted the document');

// };

// main().catch(console.error);
