const mongoose  = require('mongoose');
const CategoryData = require('./categorySchema');
const ProductData = require('./productSchema');

const variationSchema = mongoose.Schema({
    category_info : {
        type : mongoose.Schema.Types.ObjectId,
        ref : CategoryData,
        require : true,
    },
    engine_cc : {
        type : Boolean,
        default : false
    },
    km_runs : {
        type : Boolean,
        default : false
    },
    horse_power : {
        type : Boolean,
        default : false
    },
    running_hour : {
        type : Boolean,
        default : false
    },
    tyre_condition : {
        type : Boolean,
        default : false
    },
    engine_condition : {
        type : Boolean,
        default : false
    },
},{
    timestamps : true
})

const VariationData = mongoose.model( 'variationdata' , variationSchema );


const variationTypeSchema = mongoose.Schema({
    category_info : {
        type : mongoose.Schema.Types.ObjectId,
        ref : CategoryData,
        require : true,
    },
    variation_name : {
        type:String,
        required : true,
        trim : true,
    },

    variation_input : {
        type:String,
        default : 'text'
    },

    variation_select_data : {
        type: Array,
        default : null
    },
    state:{
        type: Boolean,
        default : true
    }
},{
    timestamps : true
})
const VariationTypeData = mongoose.model( 'variationtypedata' , variationTypeSchema );





const variationProductSchema = mongoose.Schema({
    product_info : {
        type : mongoose.Schema.Types.ObjectId,
        ref : ProductData,
        require : true,
    },
    variation_name : {
        type:String,
        required : true,
        trim : true,
    },

    variation_value : {
        type:String,
        default : 'text'
    }
})
const VariationProductData = mongoose.model( 'variationproductdata' , variationProductSchema );

module.exports = {VariationData,VariationTypeData,VariationProductData};