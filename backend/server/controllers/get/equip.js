import database from '../../database.js'


export const equip = (req, res) =>{
    const {type, playerId} = req.query
    database.query('SELECT * FROM `'+type+'`', function (error, equips) {
        if (error) res.json(1)
        else{
            
            
            database.query('SELECT `'+type+'` FROM `gracz` WHERE idGracz = ?;',[playerId], function (error, results2) {
                if (error) res.json(2)
                else{
                    console.log(results2);
            
                    let wedki = (results2[0][type]+"").slice(0,-1)
                    console.log(wedki);
                    let isOwned

                    if (wedki.search(";") > -1) {
                        wedki = wedki.split(';')
                        let isOwned
                        // console.log(equips);
                        // console.log(typeof(equips));
                        
                        // console.log(equips.lenght);
                        
                        for(let i = 0; i < Object.keys(equips).length; i++){
                            isOwned = false
                            let equip = equips[i]
                            wedki.forEach(wedka =>{
                                if (wedka==equip["id"]) {
                                    isOwned = true
                                }
                            })
                            equips[i]["isOwned"] = isOwned
                            
                        }
                        // result['isOwned'] = isOwned
                        // console.log(result);
                        
                        res.json(equips)
                    }else {
                        for(let i = 0; i < equips.lenght; i++){
                            isOwned = false
                            let equip = equips[i]
                            if (wedki==id) {
                                result['isOwned'] = true
                            }
                        }
                        console.log(equips);
                        
                        res.json(equips)
                    }
                }
            })
        }
    })
}