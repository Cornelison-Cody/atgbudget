var express  = require("express");
var app      = express();
var port     = process.env.PORT || 8080;

var inDev    = true;


app.use(express.static("public"));

app.set("views", "views");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("index");
});

if (inDev) {
	port = 8080;
}

app.listen(port, function() {
	console.log("port: " + port);
});