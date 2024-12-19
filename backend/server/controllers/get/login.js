import database from '../../database.js'
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
  const { login, password } = req.query;
  // const salt = await bcrypt.genSalt(); for reg
  // const hashedPassword = await bcrypt.hash(password, salt);
  console.log(new Date().toISOString().slice(0, 19).replace('T', ' '))
  
  

  database.query('SELECT `id`,`haslo`,`licznik`,`dataBlokady` FROM `dane` WHERE `login`=?',[login], async function (error, results) {
    if (error) res.json(null)
    else{
      const data = JSON.parse(JSON.stringify(results))[0]
      console.log(data);
      if(data){
        if(data['dataBlokady']!=null){
          console.log(Date.now());
          if(data['dataBlokady']+900000>=Date.now())  res.send("jestes zablokowany")
          else{
            database.query('UPDATE `dane` SET `licznik`=0,`dataBlokady`=null WHERE `login`=?',[login],  function (error, results) {
              if (error) res.json(null)
              else authentication(data)
            })
          }
        }
        else{
          authentication(data)
        }
      }else{
        res.send("incorrect login")
      }
      }
  })
  
  const authentication = async (data) =>{
    const hashedPassword = data['haslo']
    const passwordMatched = await bcrypt.compare(password, hashedPassword)
    if(passwordMatched) {
      database.query('UPDATE `dane` SET `licznik`=0 WHERE `login`=?',[login],  function (error, results) {
        if (error) res.json(null)
        else res.json(data['id'])
      })
    }
    else if(data['licznik']==3){
      const date = new Date(new Date().getTime()* 60000).toISOString()
      console.log(date);
      // date = date.replace("T","")
      database.query('UPDATE `dane` SET `dataBlokady`=? WHERE `login`=?',[date,login],  function (error, results) {
        if (error) res.json(null)
        else authentication(data)
      })
    }
    else{
      database.query('UPDATE `dane` SET `licznik`=`licznik`+1 WHERE `login`=?',[login], async function (error, results) {
        if (error) res.json(null)
        else res.send("incorrect password")
      })
    }
  }

}




