# Bamazon 

#### You've tried Amazon before and you're tired of their free shipping on an unlimited selection of products,  Bamazon is the next greatest online marketplace! Highest prices that can't be beat, and slow shipping times make it the perfect marketplace to switch to.

## **Installation**

1. ### Installing Depended Packages ###

    * To get started you need to setup some packages using Node Package Manager that the program requires to run. To do this, run the following code in your terminal. 

    ```
    npm install
    ```

    * This will install all the packages that the program is dependant on, and allow you to search for your favorite songs, movies, and artists!

2. ### Setting up your Database with MySQL ###

    * To setup your database through MAMP and DBeaver, start by setting up MAMP Port settings under MAMP > Prefrences > Ports to a localhost port.

    * Establish a new connection in DBeaver, choose MySQL as the database type, and configure the port to the port you chose earlier and fill in the username and password for the database. (Defaults to root:root)

    * Test the connection, and when successful create the new connection

    * Run the schema and seeds script in the database to create a table and seed new rows to the table. 

    * You're done, you have a database with a table filled with data

## **Features**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The program has two modes, one for the customer and another for the manager. As a customer you can purchase any product without restrictions. In the manager mode you have the freedom to edit your database, and add products to your listings.

### Customer Mode ###

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You can run the program in customer mode by navigating the Customerview folder through terminal and running the following code in terminal

```
node bamazonCustomer
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Follow along with the prompts to purchase the products that you want

### For Example ###

![bamazonCustomer](.\assets\cstmrview.gif)

### Manager Mode ###
 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You can run the program in manager mode by navigating the Managerview folder through terminal and running the following code in terminal

```
node bamazonManager
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Follow along with the prompts to view products, view products that are low in stock, add more stock to a product, and add an entirely product

### For Example ###

![movie-this](.\assets\mngrview.gif)







   










