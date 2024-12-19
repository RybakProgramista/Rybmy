import database from '../../database.js'


export const catchedFish = (req, res) => {
    const { wytrzymalosc, zaneta, przyneta } = req.query;
    database.query('SELECT * FROM `ryby` ORDER BY RAND( ) LIMIT 1', function (error, results) {
        if (error) res.json(null)
        else{
            results = JSON.parse(JSON.stringify(results))[0]
            let data = {'idRyby':'','nazwa':'','obrazek':'','waga':'','wymiar':'','cena':'','doswiadczenie':'','wystepowanie':'','opis':''}

            const luck = Math.random()-Math.random()
            

            let random = wytrzymalosc/100+zaneta/100+przyneta/100
            random += (1 - random)*luck


            console.log(random);
            
            data["wymiar"] = Math.floor((results["maxWymiar"]-results["minWymiar"])*random+results["minWymiar"])
            data["waga"] = Math.floor((results["maxKg"]-results["minKg"])*random+results["minKg"])




            Object.keys(results).forEach(key => {
                Object.keys(data).forEach(dataKey => {
                    if (key==dataKey) {
                        data[dataKey] = results[key]
                    }
                });
            });
            res.json(data)




        }
    })
}