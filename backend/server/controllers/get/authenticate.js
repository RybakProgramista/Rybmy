import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
    let accessToken = null;
    let refreshToken = null;
    let id = null;

    // Check if cookies exist before accessing them
    if (req.headers.cookie) {
        const cookies = req.headers.cookie.split("; ").reduce((acc, cookie) => {
            const [key, value] = cookie.split("=");
            acc[key] = value;
            return acc;
        }, {});

        accessToken = cookies.accessToken || null;
        refreshToken = cookies.refreshToken || null;
    }

    // If no tokens are found, move to the next middleware
    if (!accessToken && !refreshToken) {
        res.locals.id = id;
        return next();
    }

    dotenv.config();

    try {
        // Try verifying the access token
        id = jwt.verify(accessToken, process.env.TOKEN_SECRET)["userId"];
        res.locals.accessToken = accessToken;
        res.locals.refreshToken = refreshToken;
        res.cookie("accessToken", res.locals.accessToken).cookie("refreshToken", res.locals.refreshToken)
        res.locals.id = id;
        return next();
    } catch (error) {
        // If access token fails, try refreshing it
        try {
            id = jwt.verify(refreshToken, process.env.TOKEN_SECRET)["userId"];
            let newAccessToken = jwt.sign({ userId: id }, process.env.TOKEN_SECRET, { expiresIn: '86400s' });
            let newRefreshToken = jwt.sign({ userId: id }, process.env.TOKEN_SECRET, { expiresIn: '2592000s' });

            res.locals.accessToken = newAccessToken;
            res.locals.refreshToken = newRefreshToken;
            res.cookie("accessToken", res.locals.accessToken).cookie("refreshToken", res.locals.refreshToken)
            res.locals.id = id;
            return next();
        } catch (refreshError) {
            // If both tokens fail, reset user state
            res.locals.id = id;
            return next();
        }
    }
};

export default authenticate;