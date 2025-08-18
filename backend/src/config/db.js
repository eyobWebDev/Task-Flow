import mongoose from "mongoose"
import {config } from "dotenv"
config()

//const uri = process.env.NODE_ENV == "development" ? process.env.LOCAL_MONGODB_URI : process.env.MONGODB_URI

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.LOCAL_MONGODB_URI)
        console.log(`mongo db connected on ${conn.connection.host}`)
    } catch (e) {
        console.log("Error while connecting: "+ e)
    }
}