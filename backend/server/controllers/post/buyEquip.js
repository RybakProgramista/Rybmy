import database from '../../database.js'


export const buyEquip = (req, res) => {
    const { id, type, playerId } = req.query


    database.query('SELECT `cena` FROM `' + type + '` WHERE `id` = ?;', [id], function (error1, cenaRes) {
        if (error1) res.json(false)
        else {
            let cena = parseInt(cenaRes[0]['cena'])

            database.query('SELECT `pieniadze` FROM `gracz` WHERE `idGracz`=?;', [playerId], function (error2, pieniadzeGracza) {
                if (error2) res.json(false)
                else {

                    let pieniadze = parseInt(pieniadzeGracza[0]['pieniadze'])
                    if (pieniadze >= cena) {
                        let pozostalo = pieniadze - cena
                        let newElement = id + ";"
                        database.query('update gracz set ' + type + ' = concat(' + type + ', ?) where idGracz = ?', [newElement, playerId], function (error3, result1) {
                            if (error3) res.json(false)
                            else {
                                database.query('update gracz set pieniadze = ? where idGracz = ?', [pozostalo, playerId], function (error4, result1) {
                                    if (error4) res.json(false)
                                    else res.json(true)
                                })
                            }
                        })
                    } else res.json(false)

                }
            })
        }
    })




}