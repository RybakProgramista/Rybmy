import database from '../../database.js'


export const wedka = (req, res) =>{
    const id = req.query.id
    database.query('SELECT * FROM `wedka` WHERE `idWedka` = ?;',[id], function (error, results) {
        if (error) throw error
        res.json(results[0])
    })
}