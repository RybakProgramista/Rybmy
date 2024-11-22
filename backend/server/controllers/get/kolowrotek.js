import database from '../../database.js'


export const kolowrotek = (req, res) =>{
    const id = req.query.id
    database.query('SELECT * FROM `kolowrotek` WHERE `idKolowrotek` = ?;',[id], function (error, results) {
        if (error) throw error
        res.json(results[0])
    })
}