import config from '../../config.js'
import mysql from 'mysql'


export const login = (req, res) => {
    const { login, password } = req.query;
    const connection = mysql.createConnection(config.db)

    connection.query('SELECT `id` FROM `dane` WHERE `login` = ? AND `haslo` = ?;',[login, password], function (error, results) {
      if (error) throw error
  
    //   console.log(results);
      
      let table = JSON.parse(JSON.stringify(results))
      if(table == null)
        res.json(null)
      else{
        res.json(table[0])
        
      }
    })
  }




