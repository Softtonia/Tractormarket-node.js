const mongoose = require('mongoose');


const stateListSchema = new mongoose.Schema({
    state_name : {
        type : String,
        require : true,
        trim: true
    },
    state_image : String,
    state : {
        type : Boolean,
        default : true
    },
    slugs : {
        type : String,
        unique:true,
    },
}
,{
    timestamps : true
}
);
const StateListData = mongoose.model('stateListpage' , stateListSchema);




const districtListSchema = new mongoose.Schema({
    district_name : {
        type : String,
        require : true,
        trim: true
    },
    district_image:String,
    state_name:String,
    state_info : {
        type: mongoose.Schema.Types.ObjectId , 
        ref : StateListData,
        default: null


    },
    state : {
        type : Boolean,
        default : true
    },
    slugs : {
        type : String,
        unique:true,
    },
}
,{
    timestamps : true
}
);
const DistrictListData = mongoose.model('districtListpage' , districtListSchema);


const blocksListSchema = new mongoose.Schema({
    blocks_name : {
        type : String,
        require : true,
        trim: true
    },
    state : {
        type : Boolean,
        default : true
    },
    blocks_image:String,
    district_name:String,
    district_info : {
        type: mongoose.Schema.Types.ObjectId , 
        ref : DistrictListData,
        default: null
    },

    state_name:String,
    state_info : {
        type: mongoose.Schema.Types.ObjectId , 
        ref : StateListData,
        default: null

    },

    slugs : {
        type : String,
        unique:true,
    },
}
,{
    timestamps : true
}
);
const BlocksListData = mongoose.model('blocksListpage' , blocksListSchema);



module.exports = {StateListData, DistrictListData , BlocksListData};