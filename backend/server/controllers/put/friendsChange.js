import database from '../../database.js'


export const friendsChange = (req, res) => {
  const friend  = req.query;
  const id = res.locals.id
  let newfriend = friend + ";"

  database.query('UPDATE `znajomi` SET `idZnajomy`= CONCAT(`idZnajomy`, ?) WHERE `idGracz`=?;', [newfriend, id], function (error, results) {
    if (error) res.json(false)
    else res.json(true)
  })
}