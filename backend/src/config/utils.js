import jwt from "jsonwebtoken"
import { config } from "dotenv"

config()


export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 3600 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true
    })
    
    return token
}