const querys = {
    getOwned: {
        zylka: 'SELECT `zylka` FROM `gracz` WHERE idGracz = ?;',
        kolowrotek: 'SELECT `kolowrotek` FROM `gracz` WHERE idGracz = ?;',
        wedka: 'SELECT `wedka` FROM `gracz` WHERE idGracz = ?;'
    },
    getEquip: {
        zylka: ',true,false) AS "isOwned" FROM `zylka`',
        kolowrotek: ',true,false) AS "isOwned" FROM `kolowrotek`',
        wedka: ',true,false) AS "isOwned" FROM `wedka'
    }
}
export default querys