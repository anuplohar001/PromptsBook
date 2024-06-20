import mongoose from "mongoose";
let isConnect = false

export const connectDb = async () => {
    mongoose.set('strictQuery', true) //if not set get warnings in console
    // mongoose.set('strictPopulate', false)
    
    if (isConnect) {
        console.log("MongoDb already connected")
        return;
    }


    try {
        await mongoose.connect(process.env.MONGODB_URI, { dbName: "propmts",})
        isConnect = true
        console.log("mongo db connected")
    } catch (error) {
        console.log(error)
    }
}