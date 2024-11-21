import config from '../../config.js'
import mysql from 'mysql'


export const kolowrotek = (req, res) =>{
    const connection = mysql.createConnection(config.db)
    const id = req.query.id
    connection.query('SELECT * FROM `kolowrotek` WHERE `idKolowrotek` = ?;',[id], function (error, results) {
        if (error) throw error
        res.json(results[0])
    })
}