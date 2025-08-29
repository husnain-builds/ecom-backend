const mongoose = require("mongoose");


uri = "mongodb+srv://admin:IZpEm66RDo1e1pb5@cluster0.oxapm6k.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"


const connectDB = () =>{
    mongoose.connect(uri)
}

module.exports = connectDB;