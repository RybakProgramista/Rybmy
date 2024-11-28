import database from '../../database.js'


export const equip = (req, res) =>{
    const {id, type, playerId} = req.query
    database.query('SELECT * FROM `'+type+'` WHERE `id` = ?;',[id], function (error, results1) {
        if (error) res.json(1)
        else{
            let result = results1[0]
            database.query('SELECT `'+type+'` FROM `gracz` WHERE idGracz = ?;',[playerId], function (error, results2) {
                if (error) res.json(2)
                else{
                    let wedki = results2[0]['wedka']
                    if (wedki!=3) {
                        wedki = wedki.split(';')
                        let canBuy = false
                        wedki.forEach(wedka => {
                            if (wedka==id) {
                                canBuy = true
                            }
                        });
                        result['canBuy'] = canBuy
                        console.log(result);
                        
                        res.json(result)
                    }else res.json(4)
                }
            })
        }
    })
}