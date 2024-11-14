import config from '../../config.js'
import mysql from 'mysql'


export const friends =(req, res) =>{
    const connection = mysql.createConnection(config.db)
    // console.log(req.query);
    
    const id = req.query.id;
    // console.log(id);
    
    connection.query('SELECT `idZnajomy` FROM `znajomi` WHERE `idGracz`= ?',[id], function (error, results) {  //pobiera liste znajomych
      if (error) throw error
  
      let table = JSON.parse(JSON.stringify(results))
    //   console.log(table);
      
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
  
        connection.query(query, function (error, results) {
          if (error) throw error
          res.json(results)
        })}
  
      else
        res.json(null)
    })
  }