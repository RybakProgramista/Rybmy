import database from '../../database.js'
import querys from './querys.js';

export const buyEquip = (req, res) => {
    const { id, type } = req.query
    const playerId = res.locals.id
    
    const data = [id+";",playerId,id]
    
    database.query(querys.buyEquip[type], data, function (error, result) {
        if (error) res.json(false)
        else res.json(true)
    })



    
}