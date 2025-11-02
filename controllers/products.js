// model
const Product = require("../models/Products");


const getAllProducts = async (req, res) => {
    const {name, price, description, sort, select} = req.query;
    const queryObject = {};
    
    if(name){
        queryObject.name = { $regex: name, $options: "i" };
    }
    
    if(price){
        queryObject.price = price;
    }
    
    if(description){
        queryObject.description = { $regex: description, $options: "i" };
    }
    
    let apiData = Product.find(queryObject);

    if(sort){
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix);
    }
    
    if(select){
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;
    let skip = (page - 1) * limit;
    apiData = apiData.skip(skip).limit(limit);

    const myData = await apiData; 
    res.status(200).json({myData})
};


const getAllProuctsTesting = async (req, res) => {
    const myData = await Product.find(req.query).select("name description"); 
    res.status(200).json({myData})
};

module.exports = {getAllProducts, getAllProuctsTesting};