var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  findItem();
});

function findItem() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Where would you like to start?",
      choices: [
        "Shop by department",
        "Shop by price",
        "Search for items in stock",

      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "Shop by department":
          searchDept();
          break;

        case "Shop by price":
          priceSearch();
          break;

        case "Search for items in stock":
          itemSearch();
          break;
      }
    });
}


function searchDept() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "Which department would you like to search?"
    })
    .then(function(answer) {
      var query = "SELECT id, product, department,  FROM products WHERE ?";
      connection.query(query, { department: answer. }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Position: " + res[i].position + " || product: " + res[i].product + " || Department: " + res[i].department + " || Price: " + res[i].price + " || Quantity: " + res[i].quantity);
        }
        findItem();
      });
    });
}

function priceSearch() {
  var query = "SELECT id FROM products GROUP BY price HAVING price(*) > $.99";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].product);
    }
    findItem();
  });
}

function itemSearch() {
  inquirer
    .prompt({
      name: "product",
      type: "input",
      message: "What product would you like to look for?"
    })
    .then(function(answer) {
      console.log(answer.product);
      connection.query("SELECT * FROM products WHERE ?", { product: answer.product}, function(err, res) {
        console.log(
          "Position: " +
            res[0].position +
            " || Product: " +
            res[0].product +
            " || Department: " +
            res[0].department +
            " || Price: " +
            res[0].price +
            " || Quantity: " +
            res[0].quantity
        );
        findItem();
      });
    });
