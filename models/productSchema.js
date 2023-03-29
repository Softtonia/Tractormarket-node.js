const mongoose = require('mongoose');
const BrandData = require('./brandSchema');
const CategoryData = require('./categorySchema');
const ModelData = require('./modelSchema');
const { StateListData, DistrictListData, BlocksListData } = require('./productAddressSchema');


const productSchema = new mongoose.Schema({
    product_name : {
        type : String,
        require : true,
        trim: true
    },
    discription: {
        type : String,
        trim: true,
        default : "N/A"
    },
    category_name : {
        type : String,
        require : true,
        trim: true
    },
    category_info : {
        type : mongoose.Schema.Types.ObjectId,
        ref : CategoryData,
        require : true,
    },
    brand_name : {
        type : String,
        require : true,
        trim: true
    },
    brand_info : {
        type : mongoose.Schema.Types.ObjectId,
        ref : BrandData,
        require : true,
    },
    model_name : {
        type : String,
        require : true,
        trim: true
    },
    model_info : {
        type : mongoose.Schema.Types.ObjectId,
        ref : ModelData,
        require : true,
    },
    state_name : {
        type : String,
        require : true,
        trim: true
    },
    state_info : {
        type : mongoose.Schema.Types.ObjectId,
        ref : StateListData,
        require : true,
    },
    district_name : {
        type : String,
    },
    district_info : {
        type : mongoose.Schema.Types.ObjectId,
        ref : DistrictListData,
    },
    block_name : {
        type : String,
        require : true,
    },
    block_info : {
        type : mongoose.Schema.Types.ObjectId,
        ref : BlocksListData,
        require : true,
    },

    feature_image : String,
    front_image : String,
    back_image : String,
    left_image : String,
    right_image : String,

    price : {
        type : String,
        trim: true,
        required : true
    },
    purchase_year:{
        type : String,
        trim: true,
        default : "N/A"
    },
    total_owners:{
        type : Number,
        default : 1
    },

    rc:{
        type : Boolean,
        default : false
    },
    rc_image : String,
    no_owner:Number,
    noc:{
        type : Boolean,
        default : false
    },
    noc_image : String,

    engine_cc: {
        type : String,
        trim: true,
        default : "N/A"
    },
    km_runs: {
        type : String,
        trim: true,
        default : "N/A"
    },
    horse_power: {
        type : String,
        trim: true,
        default : "N/A"
    },
    running_hour: {
        type : String,
        trim: true,
        default : "N/A"
    },
    tyre_condition: {
        type : String,
        trim: true,
        default : "N/A"
    },
    engine_condition: {
        type : String,
        trim: true,
        default : "N/A"
    },


    publisher_name: {
        type : String,
        trim: true,
        default : "N/A"
    },
    publisher_phone1: {
        type : String,
        trim: true,
        default : "N/A"
    },
    publisher_phone2: {
        type : String,
        trim: true,
        default : "N/A"
    },
    publisher_address: {
        type : String,
        trim: true,
        default : "N/A"
    },


    
    product_status : {
        type : String,
        default : "pending"
    },

    gallery : Array,
    variationdata : {
        type : Array,
        default : null
    },


    slugs : String,

},{
    timestamps : true
});

const ProductData = mongoose.model('productpage' , productSchema);
module.exports = ProductData

