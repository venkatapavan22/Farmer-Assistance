import mongoose from "mongoose";

const dbConnection = async(URL) =>{
    try {
        await mongoose.connect(URL)
        console.log("Database connected")
    } catch (error) {
        console.log("Error while connecting to database",error)
    }
}

export default dbConnection