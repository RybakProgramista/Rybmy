import database from '../../database.js'
import querys from './querys.js'


export const equip = (req, res) => {
    const { type } = req.query
    const playerId = res.locals.id
    database.query(querys.getEquip[type], [playerId], function (error, equips) {
        if (error) res.json(error)
        else {
            let list = (equips[0][type] + "").slice(0, -1).split(";")
            let query
            if (list[0] == '' || list == "nul") {
                query = 'SELECT `nazwa`,`cena`, IF(1>2'
            } else {
                query = 'SELECT `nazwa`,`cena`, IF('
                list.forEach(id => {
                    query += '`id`=' + id + ' OR '
                })
                query = query.slice(0, -3)
            }
            query += querys.getOwned[type]
            database.query(query, function (error1, result) {
                if (error1) res.json(error1)
                else res.json(result)
            })
        }
    })
}