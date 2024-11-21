import express from "express"
// import mysql from "mysql"
const app = express()
import cors from "cors";
const port = 3000
import fish from "./routes/fish.js"
import player from "./routes/player.js"
import equip from "./routes/equip.js"

app.use(cors())
app.use(express.json())
app.use('/api', fish)
app.use('/api', player)
app.use('/api', equip)



app.get('/fishes', (req, res) => {   //zamiast '/fishes' wpisujesz path, np z '/fishes' będziesz miał localhost:3000/fishes
  const { login, password } = req.query; // to jest do pobierania wartości, one są wysyłane w postaci: localhost:3000/fishes?login=kacper&password=siema
  let results //przykladowa zmienna

  res.send(results) //zwraca plik html(np. tekst albo całą skladnie)
  res.json(results) //zwraca plik json lub null/true/false
})


app.listen(port, () =>{
  console.log("Nasłuchuje na porcie " + port)
})