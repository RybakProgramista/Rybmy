
const querys = {
    buyEquip: {
        zylka: 'UPDATE `gracz`, `zylka` SET `gracz`.`pieniadze`= CASE WHEN `gracz`.`pieniadze` >= `zylka`.`cena` THEN `gracz`.`pieniadze` - `zylka`.`cena` ELSE `gracz`.`pieniadze` END, `gracz`.`zylka` = CASE WHEN `gracz`.`pieniadze` >= `zylka`.`cena` THEN concat(`gracz`.`zylka`, ?) ELSE `gracz`.`zylka` END WHERE `gracz`.`idGracz`=? AND `zylka`.`id`=?;',
        kolowrotek: 'UPDATE `gracz`, `kolowrotek` SET `gracz`.`pieniadze`= CASE WHEN `gracz`.`pieniadze` >= `kolowrotek`.`cena` THEN `gracz`.`pieniadze` - `kolowrotek`.`cena` ELSE `gracz`.`pieniadze` END, `gracz`.`kolowrotek` = CASE WHEN `gracz`.`pieniadze` >= `kolowrotek`.`cena` THEN concat(`gracz`.`kolowrotek`, ?) ELSE `gracz`.`kolowrotek` END WHERE `gracz`.`idGracz`=? AND `kolowrotek`.`id`=?;',
        kedka: 'UPDATE `gracz`, `wedka` SET `gracz`.`pieniadze`= CASE WHEN `gracz`.`pieniadze` >= `wedka`.`cena` THEN `gracz`.`pieniadze` - `wedka`.`cena` ELSE `gracz`.`pieniadze` END, `gracz`.`wedka` = CASE WHEN `gracz`.`pieniadze` >= `wedka`.`cena` THEN concat(`gracz`.`wedka`, ?) ELSE `gracz`.`wedka` END WHERE `gracz`.`idGracz`=? AND `wedka`.`id`=?;',
    }
}
export default querys