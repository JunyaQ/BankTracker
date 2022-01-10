let db;
// set up to actuallt save data if there is no internet connection
const request = indexedDB.open("budget",1);//open connection to database

request.onupgradeneeded = function(event){ // listener, when run the code for the first timne use this function
    const db = event.target.result;
    db.createObjectStore("newBudget",{autoIncrement:true});// get a new database to store offline data, value with key auto increment
}

request.onsucess = function(event){// finalize the connection to the data
    db = event.target.result;

    if(navigator.onLine){// check if have internet now, if have internet then update the offline information to the origin database
        uploadBudget();// update information function
    }
}

request.onerror = function (event){
    console.log("error message: "+event.target.errorCode);
}

//submit when there is no internet
function saveRecord(record){
    const transaction = db.transaction(["newBudget"], "readwrite");

    const store = transaction.objectStore("newBudget");// access to store for newbudget

    store.add(record);// add record to store
}

//update information
function uploadBudget(){
    const transaction = db.transaction(["newBudget"], "readwrite");

    const store = transaction.objectStore("newBudget");
    
    const getAll = store.getAll();// step 1
}

// will execute after step1 complte.
getAll.onsuccess = function(){
    if (getAll.result.length > 0) {
        fetch('api/transaction/', {
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
            // open one more transaction
            const transaction = db.transaction(['newBudget'], 'readwrite');
            // access the new_pizza object store
            const store = transaction.objectStore('newBudget');
            // clear all items in your store
            store.clear();
  
            alert('All saved pizza has been submitted!');
          })
          .catch(err => {
            console.log(err);
          });
      }
}

//if browser comes back online, will execute the updatebudget function
    window.addEventListener("online", uploadBudget);