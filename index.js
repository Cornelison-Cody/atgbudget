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
	firebaseDB.addItem(req.query.uid, req.query.itemName, res);
});

app.get("/budget/items", (req, res) => {
	if(req.query.itemName) {
		firebaseDB.getItem(req.query.uid, req.query.itemName, res);
	}
	else {
		firebaseDB.getItems(req.query.uid, res);
	}
});


app.listen(port, function() {
	console.log("port: " + port);
});