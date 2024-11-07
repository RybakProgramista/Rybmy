const express = require("express")
const mysql = require('mysql')
const app = express()
const cors = require("cors")
const port = 3000

app.use(cors())
app.use(express.json())

let id = null

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rybcie'
})

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack)
    return
  }
  console.log('Connected to MySQL as ID ' + db.threadId)
})

app.get('/fishes', (req, res) => {
  db.query('SELECT * FROM `ryby`', function (error, results) {
    if (error) throw error
    res.send(results)
  })
})

app.get('/login/:login.:password', (req, res) => {
  db.query('SELECT `id` FROM `dane` WHERE `login` = "'+req.params.login+'" AND `haslo` = "'+req.params.password+'";', function (error, results) {
    if (error) throw error
    let table = results[0]
    if(table === null)
      res.send(false)
    else{
      id = table["id"]
      res.send(true)
    }
  })
})

app.get('/id', (req, res) =>{
  res.send(id);
})

app.listen(port, () =>{
  console.log("Nasłuchuje na porcie " + port)
})