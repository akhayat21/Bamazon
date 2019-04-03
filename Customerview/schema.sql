DROP DATABASE IF EXISTS customerdb;
CREATE database customerdb;

use customerdb;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NULL,
    department_name VARCHAR(255) NULL,
    price DECIMAL(6,2) NULL,
    stock_quanitity INT NULL,
    PRIMARY KEY (item_id)    
)



