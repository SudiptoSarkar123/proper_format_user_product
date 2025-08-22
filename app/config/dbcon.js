import mongoose from "mongoose";
import createError from "../helper/apiError.js";

const dbCon = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected");  
    } catch (error) {
        console.log(error);
        throw createError(500, "Database connection failed");
    }
}

export default dbCon