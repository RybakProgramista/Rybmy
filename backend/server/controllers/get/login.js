import database from '../../database.js'
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
  const { login, password } = req.query;
  // const salt = await bcrypt.genSalt(); for reg
  // const hashedPassword = await bcrypt.hash(password, salt);
  
  

  database.query('SELECT `id`,`haslo`,`licznik`, (UNIX_TIMESTAMP(`dataBlokady`)*1000) AS "date", (UNIX_TIMESTAMP(NOW())*1000) AS "now" FROM `dane` WHERE `login`=?',[login], async function (error, results) {
    if (error) res.json(-1)
    else{
      const data = JSON.parse(JSON.stringify(results))[0]
      console.log(data);
      if(data){
        if(data['date']!=null){
          console.log(data['now']);
          
          console.log(data['now']-data['date']);
          if(data['now']-data['date']<15000)  res.json(-1)
          else{
            database.query('UPDATE `dane` SET `licznik`=0,`dataBlokady`=null WHERE `login`=?',[login],  function (error, results) {
              if (error) res.json(-1)
              else authentication(data)
            })
          }
        }
        else{
          authentication(data)
        }
      }else{
        res.json(-1)
      }
      }
  })
  
  const authentication = async (data) =>{
    const hashedPassword = data['haslo']
    const passwordMatched = await bcrypt.compare(password, hashedPassword)
    if(passwordMatched) {
      database.query('UPDATE `dane` SET `licznik`=0 WHERE `login`=?',[login],  function (error, results) {
        if (error) res.json(-1)
        else res.json(data['id'])
      })
    }
    else if(data['licznik']==3){
      // let date = new Date().toISOString().slice(0, 19)
      // date = date.replace("T"," ")
      // console.log("server: "+Date.now());
      
      database.query('UPDATE `dane` SET `dataBlokady`=NOW(), `licznik`=0 WHERE `login`=?',[login],  function (error, results) {
        if (error) res.json(-1)
          
        else res.json(-1)
      })
    }
    else{
      database.query('UPDATE `dane` SET `licznik`=`licznik`+1 WHERE `login`=?',[login], async function (error, results) {
        if (error) res.json(-1)
        else res.json(-1)
      })
    }
  }

}