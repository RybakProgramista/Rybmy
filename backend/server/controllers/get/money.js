import database from '../../database.js'


export const money = (req, res) => {
  const id = res.locals.id;


  database.query('SELECT `pieniadze` FROM `gracz` WHERE `idGracz`=?;', [id], function (error, pieniadzeGracza) {
    if (error) res.json(false)
    else res.json(parseInt(pieniadzeGracza[0]['pieniadze']))
  })
}