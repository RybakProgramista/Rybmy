const express = require("express")
const mysql = require('mysql')
const app = express()
const cors = require("cors")
const port = 3000

app.use(cors())
app.use(express.json())

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
    res.json(results)
  })
})

app.get('/login', (req, res) => {
  const { login, password } = req.query;
  db.query('SELECT `id` FROM `dane` WHERE `login` = ? AND `haslo` = ?;',[login, password], function (error, results) {
    if (error) throw error

    console.log(results);
    
    let table = JSON.parse(JSON.stringify(results))
    if(table == null)
      res.json(null)
    else{
      res.json(table[0])
      
    }
  })
})

app.get('/znajomi', (req, res) =>{

  console.log(req.query);
  
  const id = req.query.id;
  console.log(id);
  
  db.query('SELECT `idZnajomy` FROM `znajomi` WHERE `idGracz`= ?',[id], function (error, results) {  //pobiera liste znajomych
    if (error) throw error

    let table = JSON.parse(JSON.stringify(results))
    console.log(table);
    
    let tableOfFriends = table[0].idZnajomy.split(";")
    
    if (tableOfFriends.length>0) {
      let query = 'SELECT * FROM `gracz` WHERE '
      let isFirst = true

      tableOfFriends.forEach(idFriend => {
        if (!isFirst) {
          query += 'OR'
        }
        isFirst = false
        query += '`idGracz`="'+idFriend+'"'
      });

      db.query(query, function (error, results) {
        if (error) throw error
        res.json(results)
      })}

    else
      res.json(null)
  })
})

app.listen(port, () =>{
  console.log("Nasłuchuje na porcie " + port)
})