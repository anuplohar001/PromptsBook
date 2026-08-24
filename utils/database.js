import mongoose from "mongoose";
// import dns from "dns";

export const connectDb = async () => {
    // dns.setServers(["8.8.8.8", "8.8.4.4"]);
    mongoose.set("strictQuery", true);
   
    if (mongoose.connection.readyState === 1) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error;
    }
};