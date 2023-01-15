const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    category_name : {
        type : String,
        require : true,
        trim: true
    },
    category_image :String,
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

const CategoryData = mongoose.model('categorypage' , categorySchema);



module.exports = CategoryData;