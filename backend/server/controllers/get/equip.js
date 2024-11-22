import database from '../../database.js'


export const equip = (req, res) =>{
    const {id, type} = req.query
    database.query('SELECT * FROM `'+type+'` WHERE `id` = ?;',[id], function (error, results) {
        if (error) res.json(null)
        else{
            res.json(results[0])
        }
    })
}