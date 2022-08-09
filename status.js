

const documents = require("./data.json")
const fs = require('fs');


const list = [];


  // Current Time Stamp
  const [currentYear, currentMonth, currentDay] = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "")
    .split(" ")[0].split("-").map(Number);
  const [currentHour, currentMinute, currentSecond] = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "")
    .split(" ")[1].split(":").map(Number);
console.log(currentYear, currentMonth, currentDay,currentHour, currentMinute, currentSecond)

  documents.forEach(async record => {
    // Document Time Stamp
    const [documentYear, documentMonth, documentDay] = record.value.params.lastSweepAt.split(" ")[0].split("-").map(Number);
    const [documentHour, documentMinute, documentSecond] = record.value.params.lastSweepAt.split(" ")[1].split(":").map(Number);
    console.log(documentYear, documentMonth, documentDay,documentHour, documentMinute, documentSecond);
    if ((currentMonth > documentMonth) || (currentDay > documentDay) || (currentHour > documentHour) || (currentMinute - 15 > documentMinute)) {
      const updateStatus = {
        ...record.value.params,
        status: "iiia"
      };
      const updatedDocuments = {
        id: record.id,
        value: { params: updateStatus }
      };
     list.push(updatedDocuments)
    }
    else{
        list.push(record)
    }
  });
  fs.writeFile("./data.json",JSON.stringify(list, null, 2),err =>{
    if(err){
      console.log(err)
    }
  });

