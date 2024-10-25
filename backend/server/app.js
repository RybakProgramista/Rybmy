const express = require("express")
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const fishes = ["karp", "lin", "leszcz"];

app.get('/fishes', (req, res) => {
    res.send(fishes)
  })

  app.get('/fishes/:id', (req, res) => {
    let id = parseInt(req.params.id);
    res.send({rybka: fishes[id]})
  })

const port = 2115;
app.listen(port, () =>{
    console.log("Nasłuchuje na porcie " + port);
});