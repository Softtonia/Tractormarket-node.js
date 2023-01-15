const mongoose = require('mongoose');
const CategoryData = require('./categorySchema');


const brandSchema = new mongoose.Schema({
    brand_name : {
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
    brand_image :String,
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

const BrandData = mongoose.model('branddata' , brandSchema);



module.exports = BrandData;