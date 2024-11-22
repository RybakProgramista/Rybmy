import database from '../../database.js'


export const possibilityToBuy = (req, res) =>{
    const {id, type, playerId} = req.query
    let cena
    database.query('SELECT `cena` FROM `'+type+'` WHERE `id` = ?;',[id], function (error, results) {
        if (error) res.json(null)
        cena = results[0]
    })
}