const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})