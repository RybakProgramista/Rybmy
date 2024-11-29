import database from '../../database.js'


export const possibilityToBuy = (req, res) => {
    const { id, type, playerId } = req.query
    let cena
    database.query('SELECT `cena` FROM `' + type + '` WHERE `id` = ?;', [id], function (error1, cenaRes) {
        if (error1) res.json(null)
        else {
            cena = parseInt(cenaRes[0]['cena'])
            console.log(1);

            database.query('SELECT `pieniadze` FROM `gracz` WHERE `idGracz`=?;', [playerId], function (error2, pieniadzeGracza) {
                if (error2) res.json(error2)
                else {
                    console.log(2);

                    let pieniadze = parseInt(pieniadzeGracza[0]['pieniadze'])
                    console.log(cena);
                    console.log(pieniadze);


                    if (cena <= pieniadze)
                        res.json(true)
                    else res.json(false)
                }
            })
        }
    })
}