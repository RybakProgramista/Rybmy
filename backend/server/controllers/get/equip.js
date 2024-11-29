import database from '../../database.js'


export const equip = (req, res) =>{
    const {id, type, playerId} = req.query
    database.query('SELECT * FROM `'+type+'` WHERE `id` = ?;',[id], function (error, results1) {
        if (error) res.json(1)
        else{
            let result = results1[0]
            console.log(results1);
            
            database.query('SELECT `'+type+'` FROM `gracz` WHERE idGracz = ?;',[playerId], function (error, results2) {
                if (error) res.json(2)
                else{
            console.log(results2);
            
                    let wedki = (results2[0][type]+"").slice(0,-1)
                    console.log(wedki);
                    
                    if (wedki.search(";") > -1) {
                        wedki = wedki.split(';')
                        let canBuy = false
                        wedki.forEach(wedka => {
                            if (wedka==id) {
                                canBuy = true
                            }
                        });
                        result['isOwned'] = canBuy
                        console.log(result);
                        
                        res.json(result)
                    }else {
                        result['isOwned'] = false
                        if (wedki==id) {
                            result['isOwned'] = true
                        }
                        console.log(result);
                        
                        res.json(result)
                    }
                }
            })
        }
    })
}