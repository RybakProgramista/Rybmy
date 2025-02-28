import database from '../../database.js'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
  if(res.locals.id != null){
    res.json(res.locals.id)
    res.end()
  }else{
    const { login, password } = req.query;
    // const salt = await bcrypt.genSalt(); for reg
    // const hashedPassword = await bcrypt.hash(password, salt);
    //$2b$10$s0xNRNq9BS5C7TELhTvXreOe/RJuHi1jVoJIWq5GYSHPnX/F7FG.G
    

    database.query('SELECT `id`,`haslo`,`licznik`, (UNIX_TIMESTAMP(`dataBlokady`)*1000) AS "date", (UNIX_TIMESTAMP(NOW())*1000) AS "now" FROM `dane` WHERE `login`=?',[login], async function (error, results) {
      if (error) {
        res.json(-11)
        res.end()
      }else{
        const data = JSON.parse(JSON.stringify(results))[0]
        if(data){
          if(data['date']!=null){
            if(data['now']-data['date']<15000)  {
              res.json(-2)
              res.end()
            }
            else{
              database.query('UPDATE `dane` SET `licznik`=0,`dataBlokady`=null WHERE `login`=?',[login],  function (error, results) {
                if (error) {
                  res.json(-3)
                  res.end()
                }
                else authentication(data)
              })
            }
          }
          else{
            authentication(data)
          }
        }else{
          res.json(-4)
          res.end()
        }
      }
        
    })
    
    const authentication = async (data) =>{
      const hashedPassword = data['haslo']
      const passwordMatched = await bcrypt.compare(password, hashedPassword)
      if(passwordMatched) {
        database.query('UPDATE `dane` SET `licznik`=0 WHERE `login`=?',[login],  function (error, results) {
          if (error) {
            res.json(-10)
            res.end()
          }
          else {
            dotenv.config()
            const accessToken = jwt.sign({userId: data['id']},process.env.TOKEN_SECRET,{expiresIn: '86400s'})
            console.log(accessToken);
            
            const refreshToken = jwt.sign({userId: data['id']},process.env.TOKEN_SECRET,{expiresIn: '2592000s'})
            res.cookie('refreshToken', refreshToken).cookie('accessToken', accessToken).json(data['id'])
            res.end()
        
          }
          
        })
      }
      else if(data['licznik']==3){
        
        database.query('UPDATE `dane` SET `dataBlokady`=NOW(), `licznik`=0 WHERE `login`=?',[login],  function (error, results) {
          if (error) {
            res.json(-19)
            res.end()
          }
            
          else {
            res.json(-18)
            res.end()
          }
        })
      }
      else{
        database.query('UPDATE `dane` SET `licznik`=`licznik`+1 WHERE `login`=?',[login], async function (error, results) {
          if (error) {
            res.json(-17)
            res.end()
          }
          else {
            res.json(-16)
            res.end()
          }
        })
      }
    }

  }
}