let db; // create variable to hold db connection
const request = indexedDB.open('budget_offline', 1); //establish a connection to IndexedDB database and set it to version 1

// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function(event) {
    // save a ref to the database
    const db = event.target.result;
  // create an object store (table) called `new_transaction`, set it to have an auto incrementing primary key of sorts 
    db.createObjectStore('new_transaction', { autoIncrement: true });
};

// upon a successful request
request.onsuccess = function(event) {
    // when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable
    db = event.target.result;

    // check if app is online, if yes run uploadTransaction() function to send all local db data to api
    if (navigator.onLine) {
    // we haven't created this yet, but we will soon, so let's comment it out for now
    uploadTransaction();
    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode); // log error here
};

// this function will be executed if we attempt to submit a new transaction and there's no internet connection
function saveRecord(record) {
    const transaction = db.transaction(['new_transaction'], 'readwrite'); // open a new transaction with the database with read and write permissions

    const moneyObjectStore = transaction.objectStore('new_transaction'); // access the object store for `new_transaction`

    moneyObjectStore.add(record); // add record to your store with add method
};

function uploadTransaction() {
    const transaction = db.transaction(['new_transaction'], 'readwrite'); // open a transaction on your db
    const moneyObjectStore = transaction.objectStore('new_transaction'); // access your object store
    const getAll = moneyObjectStore.getAll(); // get all records from store and set to a variable

    getAll.onsuccess = function() { // upon a successful .getAll() execution, run this function

    if (getAll.result.length > 0) { // if there was data in indexedDb's store, let's send it to the api server
      fetch('/api/transaction', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(serverResponse => {
          if (serverResponse.message) {
            throw new Error(serverResponse);
        }
          const transaction = db.transaction(['new_transaction'], 'readwrite'); // open one more transaction
        
          const moneyObjectStore = transaction.objectStore('new_transaction'); // access the new_transaction object store

          moneyObjectStore.clear(); // clear all items in your store

        alert('All saved transactions has been submitted!');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
};


window.addEventListener('online', uploadTransaction); // listen for app coming back online