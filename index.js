const readline = require('readline');
const axios = require('axios');

const rl = readline.createInterface({
  input: process.stdin,
});

rl.question("",newScan);

let cantidad = 0;
function newScan(pistol){
  tag = pistol.replaceAll("Ñ",":")
  .replaceAll("^","{")
  .replaceAll("¨",'"')
  .replaceAll("\*","}")
  .replaceAll("?","_")
  .replaceAll("ë",'"e')
  .replaceAll("ö",'"o')
  .replaceAll("ä",'"a')
  .replaceAll("Ä",'"A')
  .replaceAll("ü",'"u')
  .replaceAll("ï",'"i')
  .replaceAll("'",'-')

    rl.question("",newScan);
    axios.post("https://api.ar.treggo.co/0/point/checkin",{tag,pistol,scanner:"Dell ingreso depo"},{headers:{Authorization:"Bearer d5ea03c2-48d2-42c1-ad15-281b231fd504"}})
    .then((response) => {
      cantidad++
      console.log("scan",cantidad,": ",response.data.message)
    }).catch((err) => {
      console.log(err.toString())
    })
}