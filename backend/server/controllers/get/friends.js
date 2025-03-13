import database from '../../database.js'


export const friends = (req, res) => {
  const id = res.locals.id
  // console.log(id);

  database.query('SELECT `idZnajomy` FROM `znajomi` WHERE `idGracz`= ?', [id], function (error, results) {  //pobiera liste znajomych
    if (error) res.json(null)
    else {

      let list = JSON.parse(JSON.stringify(results))[0]["idZnajomy"]
      list = list.slice(0, -1)
      //   console.log(table);

      let tableOfFriends = list.split(";")

      if (tableOfFriends.length > 0) {
        let query = 'SELECT `idGracz`, `nazwa` FROM `gracz` WHERE '
        let isFirst = true

        tableOfFriends.forEach(idFriend => {
          if (!isFirst) {
            query += 'OR'
          }
          isFirst = false
          query += '`idGracz`="' + idFriend + '"'
        });

        database.query(query, function (error, results) {
          if (error) res.json(null)
          else res.json(results)
        })
      }

      else
        res.json(null)
    }
  })
}