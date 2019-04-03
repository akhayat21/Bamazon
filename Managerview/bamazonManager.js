var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');


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
    start();
});

function start(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'What would you like to do',
            choices: ['View Products for Sale','View Low Inventory','Add to Inventory','Add New Product','Exit']
        }
    ]).then(resp => {
        switch(resp.selection){
            case 'View Products for Sale':
            viewList();
            break;
            case 'View Low Inventory':
            viewLow();
            break;
            case 'Add to Inventory':
            addStock();
            break;
            case 'Add New Product':
            addProduct();
            break;
            case 'Exit':
            process.exit();
        }
    })
}

function viewList(){
    var table = new Table({
        head: ['Item ID', 'Product Name', 'Department', 'Price', 'Stock Quantity']
        , colWidths: [11, 15, 25, 10, 10]
    });
    connection.query("SELECT * FROM `products`", function (err, resp, fields) {
        for (i = 0; i < resp.length; i++) {
            table.push(Object.values(resp[i]));
        }
        console.log(table.toString());
        start();
    });
}

function viewLow(){
    var table = new Table({
        head: ['Item ID', 'Product Name', 'Department', 'Price', 'Stock Quantity']
        , colWidths: [11, 15, 25, 10, 10]
    });
    connection.query("SELECT * FROM `products` WHERE stock_quanitity < 5", function (err, resp, fields) {
        for (i = 0; i < resp.length; i++) {
            table.push(Object.values(resp[i]));
        }
        console.log(table.toString());
        start();
    });
}

function addStock(){
    var idList = [];
    connection.query("SELECT * FROM `products`", function (err, resp, fields) {
        for (i = 0; i < resp.length; i++) {
            idList.push(resp[i].item_id);
        }
    });
    inquirer.prompt([
        {
            type: 'input',
            name: 'itemid',
            message: 'Which item would you like to add stock to?',
            choices: idList
        },
        {
            type: 'input',
            name: 'amount',
            message: 'How many items would like to add?'

            }
    ]).then(resp => {
        connection.query('UPDATE products SET stock_quanitity = ? WHERE item_id = ?', [resp.amount, resp.itemid], function (err, res, fields) {
            if (err) throw err;
            console.log("You have successfully added",resp.amount,"products with the id of",resp.itemid)
            start();
          });
    })
}

function addProduct(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the product that you would like to add?'
        },
        {
            type: 'input',
            name: 'department',
            message: 'What Department does this product fall into?'
        },
        {
            type: 'input',
            name: 'price',
            message: 'How much does the product cost?'
        },
        {
            type: 'input',
            name: 'stock',
            message: 'How many items of this product are in stock?'
        }
    ]).then(resp => {
        connection.query('INSERT INTO products (product_name, department_name, price, stock_quanitity) VALUES (?,?,?,?)',[resp.name, resp.department, resp.price, resp.stock], function (err, res, fields) {
            if (err) throw err;
            console.log("You have successfully added a new product");
            start();
        })
    })
}