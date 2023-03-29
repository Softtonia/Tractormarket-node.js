const ProductData = require("../models/productSchema");



const statsGet = async (req,res) =>{
    try{
        let getdata = await ProductData.countDocuments();
        res.status(200).json({status:true , message:'success' , product_stats: getdata});

    }
    catch(err){
        res.send(err);
    }
}

module.exports = statsGet