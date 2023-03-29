
var slug = require('slug');
const filedelete = require("../helper/filedelete");
const ProductData = require('../models/productSchema');
var slugify = require('slugify');
const { VariationTypeData } = require('../models/variationSchema');
const { default: mongoose } = require('mongoose');
const CategoryData = require('../models/categorySchema');
const BrandData = require('../models/brandSchema');
const ModelData = require('../models/modelSchema');

// const productGet = async (req,res) =>{
//     try{
        
//             const findProduct = await ProductData.find();

//             if(findProduct){
//                 res.status(200).json({status:true , message:'success' , data : findProduct })
//             }
//             else{
//                 res.status(500).json({status:false , message:'failed'})
//             }

//     }
//     catch(err){
//         res.status(406).json({status:false , error:err})
//     }
// }


const productGet = async (req,res) =>{
    try{
        
            const findProduct = await ProductData.aggregate([
                {
                    $lookup : {
                        from : CategoryData.collection.name,
                        let : {cid : '$category_info'},
                        pipeline : [
                            {
                                $match : {
                                    $expr : {
                                        $and : [{
                                            $eq : ['$_id' , '$$cid']
                                        }]
                                    }
                                }
                            },
                            {
                                $project : {
                                    __v : 0,
                                    category_image : 0,
                                    state : 0 ,
                                    createdAt : 0,
                                    updatedAt : 0,
                                    _id : 0
                                }
                            }
                        ],
                        as : 'category_data'
                    
                    }
                },
                {
                    $lookup : {
                        from : BrandData.collection.name,
                        let : {cid : '$brand_info'},
                        pipeline : [
                            {
                                $match : {
                                    $expr : {
                                        $and : [{
                                            $eq : ['$_id' , '$$cid']
                                        }]
                                    }
                                }
                            },
                            {
                                $project : {
                                    __v : 0,
                                    brand_image : 0,
                                    category_name : 0,
                                    category_info : 0,
                                    state : 0 ,
                                    slugs : 0,
                                    createdAt : 0,
                                    updatedAt : 0,
                                    _id : 0
                                }
                            }
                        ],
                        as : 'brand_data'
                    
                    }
                },
                {
                    $lookup : {
                        from : ModelData.collection.name,
                        let : {cid : '$model_info'},
                        pipeline : [
                            {
                                $match : {
                                    $expr : {
                                        $and : [{
                                            $eq : ['$_id' , '$$cid']
                                        }]
                                    }
                                }
                            },
                            {
                                $project : {
                                    __v : 0,
                                    model_image : 0,
                                    category_name : 0,
                                    category_info : 0,
                                    brand_info : 0,
                                    brand_name : 0,
                                    state : 0 ,
                                    slugs : 0,
                                    createdAt : 0,
                                    updatedAt : 0,
                                    _id : 0
                                }
                            }
                        ],
                        as : 'model_data'
                    
                    }
                },
                {
                    $lookup : {
                        from : BrandData.collection.name,
                        let :  { cid : '$category_info' } ,
                        pipeline : [
                            {
                                $match : {
                                    $expr : {
                                        $and: [
                                            {
                                              $eq: ["$category_info", "$$cid"]
                                            },
                                          ],
                                    }
                                }
                            },
                            {
                                $project : {
                                    
                                    category_name : 0,
                                    category_info :0,
                                    __v : 0,
                                    slugs : 0,
                                    createdAt : 0,
                                    updatedAt : 0,
                                    state: 0 ,
                                    brand_image : 0,
                                }
                            }
                        ],
                        as : 'brands_aviable'
                    },


                },
                {
                    $lookup : {
                        from : ModelData.collection.name,
                        let :  { cid : '$brand_info' } ,
                        pipeline : [
                            {
                                $match : {
                                    $expr : {
                                        $and: [
                                            {
                                              $eq: ["$brand_info", "$$cid"]
                                            },
                                            {
                                                $eq: ["$state", true]
                                              },
                                          ],
                                    }
                                }
                            },
                            {
                                $project : {
                                    
                                    category_name : 0,
                                    category_info :0,
                                    __v : 0,
                                    slugs : 0,
                                    createdAt : 0,
                                    updatedAt : 0,
                                    model_image : 0,
                                }
                            }
                        ],
                        as : 'model_aviable'
                    },


                },
                {
                    $lookup : {
                        from : VariationTypeData.collection.name,
                        let :  { cid : '$category_info' } ,
                        pipeline : [
                            {
                                $match : {
                                    $expr : {
                                        $and: [
                                            {
                                              $eq: ["$category_info", "$$cid"]
                                            },{
                                                $eq: ["$state", true]
                                              },
                                          ],
                                    }
                                }
                            },
                            {
                                $project : {
                                    
                                    category_name : 0,
                                    category_info :0,
                                    __v : 0,
                                    slugs : 0,
                                    createdAt : 0,
                                    updatedAt : 0,
                                    model_image : 0,
                                }
                            }
                        ],
                        as : 'varient_aviable'
                    },


                }
            ]);

            if(findProduct){
                res.status(200).json({status:true , message:'success' , data : findProduct })
            }
            else{
                res.status(500).json({status:false , message:'failed'})
            }

    }
    catch(err){
        res.status(406).json({status:false , error:err})
    }
}

const productPost = async (req,res) =>{
    try{
        let {
            product_name,
            category_name,
            category_info,
            brand_name,
            brand_info,
            model_name,
            model_info,
            state_name,
            state_info,
            district_name,
            district_info,
            blocks_name,
            blocks_info,
            
            feature_image,
            front_image,
            back_image,
            left_image,
            right_image,
            price,
            purchase_year,
            rc,
            rc_image,
            noc,
            noc_image,
            gallery,

            publisher_name,
            publisher_phone1,
            publisher_phone2,
            publisher_address,
            product_status} = req.body;


            console.log(req.body , 'body data')
        if(!category_info){
        res.status(400).json({status:false , message:'failed : some data missing'})
        }

        else{
           
            const newProduct = new ProductData(req.body);
            await newProduct.save();
            if(newProduct){
                res.status(200).json({status:true , message:'success' , data : newProduct })
            }
            else{
                res.status(500).json({status:false , message:'failed'})
            }

        }

    }
    catch(err){
        res.status(406).json({status:false , error:err})
    }
}

const productPut = async (req,res) =>{
    try{
        let {product_name,category_name} = req.body;


        const findProduct = await ProductData.findById({_id:req.params.id});

        if(findProduct){

              
        let file1;

        if(req.file){
            file1 = process.env.SERVER_FILEUPLOAD_URL+req.file.filename;
            if(findProduct.image){filedelete(findProduct.image);}
        }

            findProduct.product_name = product_name || findProduct.product_name;
            findProduct.category_name = category_name || findProduct.category_name;
            findProduct.image = file1 || findProduct.image;
            findProduct.slugs = slug(product_name) || findProduct.slugs;
            await findProduct.save();

            res.status(200).json({status:true , message:'success' , data : findProduct })
        }

        else{
            res.status(500).json({status:false , message:'failed'})
        }


    }
    catch(err){
        res.status(406).json({status:false , error:err})
    }
}

const productDelete = async (req,res) =>{
    try{

        const findDelete = await ProductData.findByIdAndDelete({_id:req.params.id});
        if(findDelete){
            res.status(200).json({status:true , message:'deletion success'})
        }
        else{
            res.status(500).json({status:false , message:'deletion failed'})
        }

    }
    catch(err){
        res.status(406).json({status:false , error:err})
    }
}





const productVariationGet = async (req,res) =>{
    try{
            const findItem = await VariationProductData.find();
            if(findItem){
                res.status(200).json({status:true , message:'success' , data : findItem })
            }
            else{
                res.status(500).json({status:false , message:'failed'})
            }
    }
    catch(err){
        res.status(406).json({status:false , error:err})
    }
}

const productVariationPost = async (req,res) =>{
    try{
        let { product_info , variation_name , variation_value } = req.body;
        if(!product_info){
        res.status(400).json({status:false , message:'failed : some data missing'})
        }
  

        else{
            variation_value = variation_value.toLowerCase();
            const newItem = new VariationProductData({
                product_info , variation_name , variation_value
            });
            await newItem.save();

            if(newItem){
                res.status(200).json({status:true , message:'success' , data : newItem })
            }
            else{
                res.status(500).json({status:false , message:'failed'})
            }

        }

    }
    catch(err){
        res.status(406).json({status:false , error:err})
    }
}

const productVariationPut = async (req,res) =>{
    try{
        let {variation_name , variation_value } = req.body;

        const findItem = await VariationProductData.findById({_id:req.params.id});

        if(findItem){

            variation_value = variation_value.toLowerCase();
            findItem.variation_name = variation_name || findItem.variation_name;
            findItem.variation_value = variation_value || findItem.variation_value;
            await findItem.save();
            res.status(200).json({status:true , message:'updation success' , data : findItem })
        }

        else{
            res.status(500).json({status:false , message:'updation failed'})
        }


    }
    catch(err){
        res.status(406).json({status:false , error:err})
    }
}

const productVariationDelete = async (req,res) =>{
    try{

        const findDelete = await VariationProductData.findByIdAndDelete({_id:req.params.id});
        if(findDelete){
            res.status(200).json({status:true , message:'deletion success'})
        }
        else{
            res.status(500).json({status:false , message:'deletion failed'})
        }

    }
    catch(err){
        res.status(406).json({status:false , error:err})
    }
}

module.exports = {productGet,productPost,productPut,productDelete,productVariationGet,productVariationPost,productVariationPut,productVariationDelete};


