import database from '../../database.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

export const testLogin = (req, res) => {
    // const { login, password } = req.query;
    const token = req.headers.authorization.split(' ')[1]
    dotenv.config()
    try{
        console.log(jwt.verify(token, process.env.TOKEN_SECRET));
    } catch (error) {
        console.log("token expire");
    }


    res.json(-1)
}

export default testLogin