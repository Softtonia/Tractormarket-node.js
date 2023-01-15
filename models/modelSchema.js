const mongoose = require('mongoose');
const BrandData = require('./brandSchema');
const CategoryData = require('./categorySchema');


const modelSchema = new mongoose.Schema({
    model_name : {
        type : String,
        require : true,
        trim: true
    },
    category_name : String,
    category_info : {
        type : mongoose.Schema.Types.ObjectId,
        ref : CategoryData,
        default: null

    },
    brand_name :String,
    brand_info : {
        type : mongoose.Schema.Types.ObjectId,
        ref : BrandData,
        default: null

    },
    model_image :String,
    state : {
        type : Boolean,
        default : true
    },
    slugs : {
        type : String,
        unique:true,
    },
},{
    timestamps : true
});

const ModelData = mongoose.model('modeldata' , modelSchema);



module.exports = ModelData;