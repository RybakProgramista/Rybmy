import config from '../../config.js'
import mysql from 'mysql'


export const fishes = (req, res) =>{
    const connection = mysql.createConnection(config.db)
    connection.query('SELECT * FROM `ryby`', function (error, results) {
        if (error) throw error
        res.json(results)
    })
}