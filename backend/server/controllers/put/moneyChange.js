import database from '../../database.js'


export const moneyChange = (req, res) => {
  const { id, change } = req.query;


  database.query('UPDATE `gracz` SET `pieniadze`= `pieniadze` + ? WHERE `idGracz`=?;', [change, id], function (error, results) {
    if (error) res.json(false)
    else res.json(true)
  })
}