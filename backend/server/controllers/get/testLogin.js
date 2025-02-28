import database from '../../database.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

export const testLogin = (req, res) => {
    // const { login, password } = req.query;
    // const token = req.headers.cookie.split("; ")[1].split("=")[1]
    // const refreshToken = req.headers.cookie.split("; ")[0].split("=")[1]
    // dotenv.config()
    // try{
    //     console.log(jwt.verify(token, process.env.TOKEN_SECRET));
    // } catch (error) {
    //     console.log(refreshToken);
    // }


    res.json("test")
}

export default testLogin