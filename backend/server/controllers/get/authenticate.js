import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

export const authenticate = async (req, res, next) => {
    // const accessToken = req.headers.authorization.split(' ')[1]
    const accessToken = req.headers['authorization']
    const refreshToken = req.cookies['refreshToken']
    if (!accessToken && !refreshToken) {
        
    }

}

export default authenticate