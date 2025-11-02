const mongoose = require ("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = () =>{
   try {
       mongoose.connect(process.env.MONGO_URL)
       console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ MongoDB connection error:", err)
    } 
}

module.exports = connectDB;