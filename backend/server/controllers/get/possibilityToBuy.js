import database from '../../database.js'
import querys from './querys.js'

export const possibilityToBuy = (req, res) => {
    let { id, type } = req.query
    const playerId = res.locals.id
    ++id
    // console.log(id + "   "+ playerId);
    // console.log(querys.possibilityToBuy[type]);
    
    database.query(querys.possibilityToBuy[type], [id, playerId], function (error, result) {
        if (error) res.json(error)
        else {
        // console.log(result);
    
            res.json(result[0]["possib"])
        }
    })
}