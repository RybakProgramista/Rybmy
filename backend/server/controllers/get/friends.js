import database from '../../database.js'


export const friends =(req, res) =>{
    const id = req.query.id;
    // console.log(id);
    
    database.query('SELECT `idZnajomy` FROM `znajomi` WHERE `idGracz`= ?',[id], function (error, results) {  //pobiera liste znajomych
      if (error) res.json(null)
      else{
  
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
    
          database.query(query, function (error, results) {
            if (error) res.json(null)
            else res.json(results)
          })}
    
        else
          res.json(null)
      }
    })
  }