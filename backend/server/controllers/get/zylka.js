import database from '../../database.js'


export const zylka = (req, res) =>{
    const id = req.query.id
    database.query('SELECT * FROM `zylka` WHERE `idZylka` = ?;',[id], function (error, results) {
        if (error) throw error
        res.json(results[0])
    })
}