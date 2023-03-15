const express = require("express")
const app = express()
const path = require("path")
const fs = require('fs');
const hbs = require("hbs")

app.set("view engine", "hbs")
app.set("views", "./views")
app.use(express.static("public"))
hbs.registerPartials(__dirname +"/views/partials")

app.listen(3000)

app.get("/", (req, res) => {
    

const filePath = path.join('bd.json');
let cardData = [];

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  
  cardData = JSON.parse(data);
  
 let container = "";

 for (let key in cardData.paises) {
  const pais = cardData.paises[key];
  container += `
    <div class="tarjeta">
    <img src="${pais.Bandera}" class="bandera"></img>
    <div class="card-body">
      <h5>Continente: ${pais.Continente}</h5>
      <h4>País: ${pais.Pais}</h4>
      <p class="card-text">Capital: ${pais.Capital}</p>
    </div>
    </div>
    `;    
}
  res.render("index", { cards: container }); 
})

});