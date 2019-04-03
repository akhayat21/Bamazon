var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var customerID = "";
var customerQuantity = "";
var updatedquantity = "";
var totalCost = "";
var table = new Table({
    head: ['Item ID', 'Product Name', 'Department', 'Price', 'Stock Quantity']
    , colWidths: [11, 15, 25, 10, 10]
});

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'customerdb'
});

connection.connect(function (err) {
    if (err) {
        return;
    }

    displayTable();
    
});

function displayTable(){
connection.query("SELECT * FROM `products`", function (err, resp, fields) {
    for (i = 0; i < resp.length; i++) {
        table.push(Object.values(resp[i]));
    }
    console.log(table.toString());
    inqPrompt();
})
}


function inqPrompt(){
        inquirer
            .prompt([
                {
                    name: "id",
                    type: "input",
                    message: "What is the ID of the product you would like to buy",
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to buy?"
                }
            ]).then(resp => {
                customerID = resp.id;
                customerQuantity = resp.quantity;

                connection.query('SELECT * FROM `products` WHERE `item_id` = ?', [customerID], function (err, res, fields) {
                    if (err) throw err;

                    if(res[0].stock_quanitity >= customerQuantity){
                        updatedquantity = parseInt(res[0].stock_quanitity) - parseInt(customerQuantity);
                        totalCost = parseFloat(customerQuantity) * parseFloat(res[0].price)
                        console.log("You have successfully bought",customerQuantity,res[0].product_name+", your total is",totalCost+"$");
                        connection.query('UPDATE products SET stock_quanitity = ? WHERE item_id = ?', [updatedquantity, customerID], function (err, resu, fields) {
                            if (err) throw err;
                            process.exit()
                            
                        })
                    } else {
                        console.log("Sorry, We only have",res[0].stock_quanitity,"in stock");
                        process.exit()
                    }
                })
            });
        };


