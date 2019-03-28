const express    = require("express");
const app        = express();
const port       = process.env.PORT || 8080;
const firebaseDB = require('./controller/firestoreFunctions.js');

app.use(express.static("public"));

app.set("views", "views");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("index");
});

app.post("/budget/items", (req, res) => {
	if(req.query.function === "addItem") {
		firebaseDB.addItem(req.query.uid, req.query.name, Number(req.query.amount), res);
	}
	else if (req.query.function === "addExpense") {
		firebaseDB.addExpense(req.query.uid, req.query.name, Number(req.query.amount), req.query.description, res);
	}
	else {
		console.log(req.query.function);
	}

});

app.get("/budget/items", (req, res) => {
	if(req.query.function === "getItems") {
		if(req.query.itemName) {
			firebaseDB.getItem(req.query.uid, req.query.itemName, res);
		}
		else {
			firebaseDB.getItems(req.query.uid, res);
		}
	}
	else if (req.query.function === "getExpenses") {
		firebaseDB.getExpenses(req.query.uid, res);
	}
	else {
		console.log(req.query.function);
	}
});


app.listen(port, function() {
	console.log("port: " + port);
});