import config from '../../config.js'
import mysql from 'mysql'


export const kolowrotekT = (req, res) =>{
    const connection = mysql.createConnection(config.db)
    const id = req.query.id
    connection.query('SELECT * FROM `kolowrotek` WHERE `idKolowrotek` = ?;',[id], function (error, results) {
        if (error) throw error
        let result = []
        const data = results[0]
        let i = 0
        Object.keys(data).forEach(key => {
            result[i] = data[key]
            i++
        });

        res.json(result)
    })
}