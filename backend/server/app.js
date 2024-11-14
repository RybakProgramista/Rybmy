import express from "express"
// import mysql from "mysql"
const app = express()
import cors from "cors";
const port = 3000
import fish from "./routes/fish.js"
import player from "./routes/player.js"

app.use(cors())
app.use(express.json())
app.use('/api', fish)
app.use('/api', player)

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'rybcie'
// })

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL: ' + err.stack)
//     return
//   }
//   console.log('Connected to MySQL as ID ' + db.threadId)
// })

// app.get('/fishes', (req, res) => {
//   db.query('SELECT * FROM `ryby`', function (error, results) {
//     if (error) throw error
//     res.json(results)
//   })
// })

// app.get('/login', (req, res) => {
//   const { login, password } = req.query;
//   db.query('SELECT `id` FROM `dane` WHERE `login` = ? AND `haslo` = ?;',[login, password], function (error, results) {
//     if (error) throw error

//     console.log(results);
    
//     let table = JSON.parse(JSON.stringify(results))
//     if(table == null)
//       res.json(null)
//     else{
//       res.json(table[0])
      
//     }
//   })
// })

// app.get('/znajomi', (req, res) =>{

//   console.log(req.query);
  
//   const id = req.query.id;
//   console.log(id);
  
//   db.query('SELECT `idZnajomy` FROM `znajomi` WHERE `idGracz`= ?',[id], function (error, results) {  //pobiera liste znajomych
//     if (error) throw error

//     let table = JSON.parse(JSON.stringify(results))
//     console.log(table);
    
//     let tableOfFriends = table[0].idZnajomy.split(";")
    
//     if (tableOfFriends.length>0) {
//       let query = 'SELECT * FROM `gracz` WHERE '
//       let isFirst = true

//       tableOfFriends.forEach(idFriend => {
//         if (!isFirst) {
//           query += 'OR'
//         }
//         isFirst = false
//         query += '`idGracz`="'+idFriend+'"'
//       });

//       db.query(query, function (error, results) {
//         if (error) throw error
//         res.json(results)
//       })}

//     else
//       res.json(null)
//   })
// })


app.listen(port, () =>{
  console.log("Nasłuchuje na porcie " + port)
})