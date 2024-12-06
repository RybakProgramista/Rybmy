import database from '../../database.js'
import querys from './querys.js'


export const equip = (req, res) => {
    const { type, playerId } = req.query
    database.query(querys.getOwned[type], [playerId], function (error, equips) {
        if (error) res.json(error)
        else {
            let list = (equips[0]["kolowrotek"] + "").slice(0, -1).split(";")
            let query
            if (list[0] == '') {
                query = 'SELECT *, IF(1>2'
            } else {
                query = 'SELECT *, IF('
                list.forEach(id => {
                    query += '`id`=' + id + ' OR '
                })
                query = query.slice(0, -3)
            }
            query += querys.getEquip[type]
            database.query(query, function (error1, result) {
                if (error1) res.json(error1)
                else res.json(result)
            })
        }
    })
}