import mongoose from "mongoose";
let isConnect = false

export const connectDb = async () => {
    mongoose.set('strictQuery', true)
    if (isConnect) {
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