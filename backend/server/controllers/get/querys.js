
const querys = {
    getEquip: {
        zylka: 'SELECT `zylka` FROM `gracz` WHERE idGracz = ?;',
        kolowrotek: 'SELECT `kolowrotek` FROM `gracz` WHERE idGracz = ?;',
        wedka: 'SELECT `wedka` FROM `gracz` WHERE idGracz = ?;',
    },
    getOwned: {
        zylka: ',"Bought","NotBought") AS "isOwned" FROM `zylka`',
        kolowrotek: ',"Bought","NotBought") AS "isOwned" FROM `kolowrotek`',
        wedka: ',"Bought","NotBought") AS "isOwned" FROM `wedka`',
    },
    possibilityToBuy: {
        zylka: "SELECT IF(`gracz`.`pieniadze` >= `zylka`.`cena`, true, false) AS 'possib' FROM `gracz`,`zylka` WHERE `zylka`.`id`=? AND `gracz`.`idGracz` = ?;",
        kolowrotek: "SELECT IF(`gracz`.`pieniadze` >= `kolowrotek`.`cena`, true, false) AS 'possib' FROM `gracz`,`kolowrotek` WHERE `kolowrotek`.`id`=? AND `gracz`.`idGracz` = ?;",
        wedka: "SELECT IF(`gracz`.`pieniadze` >= `wedka`.`cena`, true, false) AS 'possib' FROM `gracz`,`wedka` WHERE `wedka`.`id`=? AND `gracz`.`idGracz` = ?;",
    },
}
export default querys