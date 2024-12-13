import database from '../../database.js'


export const fishes = (req, res) => {
    database.query('SELECT * FROM `ryby`', function (error, results) {
        if (error) res.json(null)
        else res.json(results)
    })
}