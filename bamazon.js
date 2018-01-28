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
      message: "What would you like to buy?",
      choices: [
        "Shop by department",
        "Shop by price",
        "Search by product name",
        "Search for items in stock"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "Shop by department":
          searchDept();
          break;

        case "Shop by price":
          multiSearch();
          break;

        case "Search by product name":
          rangeSearch();
          break;

        case "Search for items in stock":
          songSearch();
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
      var query = "SELECT id, product, department FROM products WHERE ?";
      connection.query(query, { department: answer. }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Position: " + res[i].position + " || product: " + res[i].product + " || Year: " + res[i].year);
        }
        findItem();
      });
    });
}

function multiSearch() {
  var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].artist);
    }
    findItem();
  });
}

function rangeSearch() {
  inquirer
    .prompt([
      {
        name: "start",
        type: "input",
        message: "Enter starting position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "end",
        type: "input",
        message: "Enter ending position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
      connection.query(query, [answer.start, answer.end], function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(
            "Position: " +
              res[i].position +
              " || Song: " +
              res[i].song +
              " || Artist: " +
              res[i].artist +
              " || Year: " +
              res[i].year
          );
        }
        findItem();
      });
    });
}

function songSearch() {
  inquirer
    .prompt({
      name: "song",
      type: "input",
      message: "What song would you like to look for?"
    })
    .then(function(answer) {
      console.log(answer.song);
      connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
        console.log(
          "Position: " +
            res[0].position +
            " || Song: " +
            res[0].song +
            " || Artist: " +
            res[0].artist +
            " || Year: " +
            res[0].year
        );
        findItem();
      });
    });
