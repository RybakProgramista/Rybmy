import database from '../../database.js'


export const zylkaT = (req, res) =>{
    const id = req.query.id
    database.query('SELECT * FROM `zylka` WHERE `idZylka` = ?;',[id], function (error, results) {
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