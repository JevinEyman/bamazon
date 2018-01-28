DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL (10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products

VALUES ("bread", "grocery", 2.50, 1000), ("coffee", "grocery", 6.75, 800),("pants", "clothing", 49.99, 40),
 ("flowers", "gardening", 3.25, 50), ("sunscreen", "hygiene", 9.99, 60)
