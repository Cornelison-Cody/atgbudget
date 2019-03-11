var express = require("express");

var app = express();

app.use(express.static("public"));

app.set("views", "views");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	console.log("Received a request for /");
	res.render("home");
});

app.get("/pages", function(req, res) {
	// Controller
	console.log("Received a request for the home page");
		res.render("pages");
});

app.get("/math", function(req, res) {
	// Controller
	console.log("Received a request for the math page");
	var params = {result: getResults(req.query)};
	res.render("math", params);
});

app.get("/math_service", function (req, res) {

});

app.listen(5000, function() {
	console.log("The server is up and listening on port 5000");
});


function getResults(data) {
	if (data.submit == 'Add') {
		return add(data.num1, data.num2);
	}
	else if (data.submit == 'Subtract') {
		return subtract(data.num1, data.num2);
	}
	else if (data.submit == 'Multiply') {
		return multiply(data.num1, data.num2);
	}
	else if (data.submit == 'Divide') {
		return divide(data.num1, data.num2);
	}
	else {
		console.log("Something weird happened. What did you click on????");
	}
}

function subtract(num1, num2)
{
	// console.log("Subtract" + num1 + ' ' + num2);
	return parseInt(num1) - parseInt(num2);
}

function divide(num1, num2)
{
	// console.log("Divide" + num1 + ' ' + num2);
	return parseInt(num1) / parseInt(num2);
}

function multiply(num1, num2)
{
	// console.log("Multiply" + num1 + ' ' + num2);
	return parseInt(num1) * parseInt(num2);
}

function add(num1, num2)
{
	// console.log("Add" + num1 + ' ' + num2);
	return parseInt(num1) + parseInt(num2);
}