import database from '../../database.js'


export const moneyChange = (req, res) => {
  const { change } = req.query;
  const id = res.locals.id

  database.query('UPDATE `gracz` SET `pieniadze`= `pieniadze` + ? WHERE `idGracz`=?;', [change, id], function (error, results) {
    if (error) res.json(false)
    else res.json(true)
  })
}