const readline = require('readline');
const axios = require('axios');
const args = require("args-parser")(process.argv)

const rl = readline.createInterface({
  input: process.stdin,
});

rl.question("",newScan);
function newScan(pistol){
    rl.question("",newScan);
    axios.post("https://api.ar.treggo.co/0/point/checkin",{pistol,scanner:args.scanner},{headers:{Authorization:"Bearer " + args.secret}})
    .then((response) => {
      console.log("scan",cantidad,": ",response.data.message)
    }).catch((err) => {
      console.log(err.toString())
    })
}