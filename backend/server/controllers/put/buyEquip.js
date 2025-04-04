import database from '../../database.js'
import querys from './querys.js';

export const buyEquip = (req, res) => {
    
    let { id, type } = req.query
    // console.log(res.locals.id);
    
    const playerId = res.locals.id
    ++id
    const data = [id+";",playerId,id]
    // console.log(data);
    
    database.query(querys.possibilityToBuy[type], [id, playerId], function (error, result) {
        if (error) res.json(false)
        else {
        // console.log(result);
    
            res.json(result[0]["possib"])
        }
    })
    console.log(querys.buyEquip[type]);
    database.query(querys.buyEquip[type], data, function (error, result) {
        if (error) {
            console.log(error);
        }
        else res.end
        
        
    })



    
}