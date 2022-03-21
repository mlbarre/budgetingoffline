// create variable to hold db connection
let db;
// establish a connection to IndexedDB database called 'budgetingoffline' and set it to version 1
const request = indexedDB.open('budgetingoffline', 1);