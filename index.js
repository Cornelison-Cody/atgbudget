var express  = require("express");
var app      = express();
var port     = process.env.PORT || 8080;

app.use(express.static("public"));

app.set("views", "views");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("index");
});

app.listen(port, function() {
	console.log("port: " + port);
});