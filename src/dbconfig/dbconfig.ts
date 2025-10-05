import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export async function connectToDatabase() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        if (process.env.MONGO_URI === undefined) {
            throw new Error("MONGO_URI is not defined");
        }
        const connection = mongoose.connection 
        connection.on("connected",() => {
            console.log("Database connected successfully");
        })
        connection.on("error",(err) => {
            console.log("Database connection error:", err);       
            process.exit();
        }) 
    } catch (error) {
        console.log("Error connecting to database:", error);
        process.exit();
    }
}