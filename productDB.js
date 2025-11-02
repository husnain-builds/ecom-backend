const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const Product = require("./models/Products");
const ProductJSON = require('./products.json');

dotEnv.config();

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL);
        await Product.deleteMany();
        await Product.create(ProductJSON)
        console.log("Success")
    } catch (error) {
        console.log(error);
    }
};

connectDB();
