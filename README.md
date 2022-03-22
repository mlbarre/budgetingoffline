# welcome to Budgeting Offline, a budget app with offline functionality

## description
This lovely website includes a budget tracker to keep track of expenses either deposits or deductions. An added bonus about this webpage is the tracker has offline functionality, meaning you'll be able to input or subtract funds without a stable internet connection and it will still save the transactions you input. Neat!

## installation & usage
* IndexedDB was used instead of MongoDB to create a more offline database.
* In order to create an IndexedDB for your webpage, you'll need to create an `idb.js` file, add `let db;` and `const request = indexedDB.open('DATABASE_NAME', 1);` to start a connection.
* Express.js plays a role for routes to front end and the main server for this project.
    - installation of Express: `npm i express`.

Node.js is required.

## collaborators
me, myself, and i

## tests
this project doesn't include jest to be tested. 

## repo & deployment
* ( ◑‿◑)ɔ┏🍟--🍔┑٩(^◡^ )
* [repository](https://github.com/mlbarre/budgetingoffline)
* [heroku deploy](https://damp-ravine-93214.herokuapp.com/)