import database from '../../database.js'


export const login = (req, res) => {
    const { login, password } = req.query;

    database.query('SELECT `id` FROM `dane` WHERE `login` = ? AND `haslo` = ?;',[login, password], function (error, results) {
      if (error) res.json(null)
      else{
    
      //   console.log(results);
        
        let table = JSON.parse(JSON.stringify(results))
        if(table == null)
          res.json(null)
        else{
          res.json(table[0])
          
        }
      }
    })
  }




