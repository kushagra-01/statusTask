
const documents = require("./data.json")
const fs = require('fs');

console.log(documents[0].value.params)
let arr =[];
  // status changed to sweep
documents.map(element => {
  
    const updateStatus = {
      ...element.value.params ,
      status: "dirty",
      lastSweepAt: new Date().toISOString().replace(/T/, " ").replace(/\..+/, "")
    };
    let updatedDocuments = {
      id: element.id,
      value: { params: updateStatus }
    };
    arr.push(updatedDocuments);
     
  });
  fs.writeFile("./data.json",JSON.stringify(arr, null, 2),err =>{
    if(err){
      console.log(err)
    }
  });
