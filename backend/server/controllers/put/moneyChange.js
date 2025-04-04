import database from '../../database.js'


export const moneyChange = (req, res, next) => {
  
  const id = res.locals.id
  const change = res.locals.moneyChange

  database.query('UPDATE `gracz` SET `pieniadze`= `pieniadze` + ? WHERE `idGracz`=?;', [change, id], function (error, results) {
    
    res.end()
  })
}