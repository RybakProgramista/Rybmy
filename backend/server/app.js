const express = require("express")
const mysql = require('mysql');
const app = express();
const cors = require("cors");
const port = 3000

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rybcie'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + db.threadId);
});

app.get('/fishes', (req, res) => {
  db.query('SELECT * FROM `ryby`', function (error, results) {
    if (error) throw error;
    res.send(results);
  })
})

// const fishes = ["karp", "lin", "leszcz"];

// app.get('/fishes', (req, res) => {
//     res.send(fishes)
//   })

// app.get('/fishes/:id', (req, res) => {
//   let id = parseInt(req.params.id);
//   res.send({rybka: fishes[id]})
// })

// const port = 2115;
app.listen(port, () =>{
    console.log("Nasłuchuje na porcie " + port);
});