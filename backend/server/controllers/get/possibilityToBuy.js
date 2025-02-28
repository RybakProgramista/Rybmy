import database from '../../database.js'
import querys from './querys.js'

export const possibilityToBuy = (req, res) => {
    const { id, type } = req.query
    const playerId = res.locals.id
    database.query(querys.possibilityToBuy[type], [id, playerId], function (error, result) {
        if (error) res.json(error)
        else {
            res.json(result[0]["possib"])
        }
    })
}