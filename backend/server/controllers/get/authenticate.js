import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

export const authenticate = async (req, res, next) => {
    // const accessToken = req.headers.authorization.split(' ')[1]
    let accessToken
    let refreshToken
    let id = null
    try{
        accessToken = req.headers.cookie.split("; ")[0].split("=")[1]
        refreshToken = req.headers.cookie.split("; ")[1].split("=")[1]
    }catch(error){
        res.locals.id = id
        next()
    }
    if (!accessToken && !refreshToken) {
        res.locals.id = id
        next()
    }
    dotenv.config()
    try{
        id = jwt.verify(accessToken, process.env.TOKEN_SECRET)["userId"];
        res.locals.accessToken = accessToken
        res.locals.refreshToken = refreshToken
        // res.cookie("accessToken", res.locals.accessToken).cookie("refreshToken", res.locals.refreshToken)
        res.locals.id = id
        next()
    } catch (error) {
        
        try{
            id = jwt.verify(refreshToken, process.env.TOKEN_SECRET)["userId"];
            let newAccessToken = jwt.sign({userId: id},process.env.TOKEN_SECRET,{expiresIn: '86400s'})
            let newRefreshToken = jwt.sign({userId: id},process.env.TOKEN_SECRET,{expiresIn: '2592000s'})
            res.locals.accessToken = newAccessToken
            res.locals.refreshToken = newRefreshToken
            // res.cookie("accessToken", res.locals.accessToken).cookie("refreshToken", res.locals.refreshToken)
            res.locals.id = id
            next()

        } catch(error){
            res.locals.id = id
            next()
            
        }
    }

}

export default authenticate