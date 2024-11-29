import database from '../../database.js'


export const equip = (req, res) =>{
    const {type, playerId} = req.query
    database.query('SELECT * FROM `'+type+'`', function (error, equips) {
        if (error) res.json("err1")
        else{
            
            
            database.query('SELECT `'+type+'` FROM `gracz` WHERE idGracz = ?;',[playerId], function (error, results2) {
                if (error) res.json("err2")
                else{
                    console.log(results2);
            
                    let wedki = (results2[0][type]+"")
                    console.log(wedki);
                    if (wedki=="null") {
                        console.log(1);
                        for(let i = 0; i < Object.keys(equips).length; i++){
                            equips[i]["isOwned"] = false
                            
                        }
                        res.json(equips)
                    }
                    else {
                        wedki = wedki.slice(0,-1)
                    
                        console.log(equips);
                        
                        if (wedki.search(";") > -1) {
                            console.log(2);
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
                            console.log(3);
                            
                            for(let i = 0; i < Object.keys(equips).length; i++){
                                let equip = equips[i]
                                if (wedki==equip["id"]) equips[i]['isOwned'] = true
                                else equips [i]['isOwned'] = false

                            }
                            console.log(equips);
                            
                            res.json(equips)
                        }
                    }
                }
            })
        }
    })
}