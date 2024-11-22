import database from '../../database.js'


export const equipT = (req, res) =>{
    const {id, type} = req.query
    database.query('SELECT * FROM `'+type+'` WHERE `id` = ?;',[id], function (error, results) {
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