import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export async function connectToDatabase() {
    try {
        mongoose.connect(process.env.MONGO_URL!)
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