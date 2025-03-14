import express from "express"
const app = express()
import cors from "cors";
const port = 3000
import fish from "./routes/fish.js"
import player from "./routes/player.js"
import equip from "./routes/equip.js"
import crypto from 'crypto'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

// app.use(cors({credentials: true, origin: 'http://localhost:4200'}));

app.use(express.json())
app.use('/api',cors({credentials: true, origin: 'http://localhost:4200'}), fish)
app.use('/api',cors({credentials: true, origin: 'http://localhost:4200'}), player)
app.use('/api',cors({credentials: true, origin: 'http://localhost:4200'}), equip)
// app.use();




// app.get('/fishes', (req, res) => {   //zamiast '/fishes' wpisujesz path, np z '/fishes' będziesz miał localhost:3000/fishes
//   const { login, password } = req.query; // to jest do pobierania wartości, one są wysyłane w postaci: localhost:3000/fishes?login=kacper&password=siema
//   let results //przykladowa zmienna

//   res.send(results) //zwraca plik html(np. tekst albo całą skladnie)
//   res.json(results) //zwraca plik json lub null/true/false
// })


app.listen(port, () => {
  dotenv.config()
  console.log(jwt.sign({userId: "4"},process.env.TOKEN_SECRET,{expiresIn: '100s'}));

  console.log("Nasłuchuje na porcie " + port)
})