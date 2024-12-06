import database from '../../database.js'
import querys from './querys.js'

export const possibilityToBuy = (req, res) => {
    const { id, type, playerId } = req.query
    database.query(querys.possibilityToBuy[type], [id, playerId], function (error, result) {
        if (error1) res.json(error)
        else {
            res.json(result[0]["possib"])
        }
    })
}