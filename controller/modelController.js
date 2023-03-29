const filedelete = require("../helper/filedelete");
const ModelData = require("../models/modelSchema");
var slugify = require('slugify');
var randomstring = require('randomstring');
const BrandData = require("../models/brandSchema");
const CategoryData = require("../models/categorySchema");

// const modelGet = async (req,res) =>{
//     try{

//             const findModel = await ModelData.find().populate('category_info brand_info').select('-__v');
//             if(findModel){
//                 res.status(200).json({status:true , message:'success' , data : findModel })
//             }
//             else{
//                 res.status(500).json({status:false , message:'failed'})
//             }

//     }
//     catch(err){
//         res.status(406).json({status:false , error:err})
//     }
// }

const modelGet = async (req,res) =>{
    try{

            const findModel = await ModelData.aggregate([
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
                        from : BrandData.collection.name,
                        let :  { bid : '$brand_info' } ,
                        pipeline : [
                            {
                                $match : {
                                    $expr : {
                                        $and: [
                                            {
                                              $eq: ["$_id", "$$bid"]
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
                        as : 'current_brands'
                    },
                },
                {
                    $lookup : {
                        from : CategoryData.collection.name,
                        let :  { cid : '$category_info' } ,
                        pipeline : [
                            {
                                $match : {
                                    $expr : {
                                        $and: [
                                            {
                                              $eq: ["$_id", "$$cid"]
                                            },
                                          ],
                                    }
                                }
                            },
                            {
                                $project : {
                                    
                                    brand_name : 0,
                                    brand_info :0,
                                    __v : 0,
                                    slugs : 0,
                                    createdAt : 0,
                                    updatedAt : 0,
                                    state: 0 ,
                                    category_image : 0,
                                    
                                }
                            }
                        ],
                        as : 'current_category'
                    },
                }
            ]);
            if(findModel){
                res.status(200).json({status:true , message:'success' , data : findModel })
            }
            else{
                res.status(500).json({status:false , message:'failed'})
            }

    }
    catch(err){
        res.status(406).json({status:false , error:err})
    }
}


const modelPost = async (req,res) =>{
    try{
        let {brand_name,
            model_name,
            category_name,
            category_info,
            brand_info,
            model_image,
            slugs} = req.body;

        if(!model_name){
        res.status(400).json({status:false , message:'failed : some data missing'})
        }

        /* slug code phase - 1 */
        let newslug
        if(req.body.slugs){
            newslug  = req.body.slugs.split(" ").join("-");
        }
        console.log(newslug, '======= 000')
        const slugVerify = await ModelData.find({slugs:newslug}).countDocuments();
        console.log(slugVerify , 'slug status')
        if(newslug && slugVerify>0){
            return res.status(408).json({status:false , message:'failed : slug already used'})
        }


        else{
           /* slug code phase - 2 */
           if(!newslug || slugVerify==0){
            console.log(newslug , 'process called 02')
            newslug = slugify(newslug || slugify(req.body.model_name)+'-'+randomstring.generate(4).toLocaleLowerCase() );
            }
  

            const findModel = new ModelData({
                brand_name,
                model_name,
                category_name,
                category_info,
                brand_info,
                model_image,
                slugs : newslug.toLocaleLowerCase() 

            });
            await findModel.save();
           
            res.status(200).json({status:true , message:'success' , data : findModel })
           

        }

    }
    catch(err){
        res.status(406).json({status:false , error:err})
    }
}


const modelPut = async (req,res) =>{
    try{

        const findModel = await ModelData.findById({_id:req.params.id});

      

        if(findModel){

            // let file1;
            // if(req.file){
            //     file1 = process.env.SERVER_FILEUPLOAD_URL+req.file.filename;
            //     if(findModel.model_image){filedelete(findModel.model_image);}
            // }


            /* slug code */
            let newslug
            if(req.body.slugs){
                newslug  = req.body.slugs.split(" ").join("-");
            }
            const slugVerify = await ModelData.find({slugs:newslug}).countDocuments();
            switch (newslug) {
                case newslug === findModel.slugs:
                    break;
                case slugVerify > 0 : 
                     res.status(408).json({status:false , message:'failed : slug already used'})
                    break;
            }

        

            findModel.model_name    =     req.body.model_name || findModel.model_name;
            findModel.brand_name    =     req.body.brand_name || findModel.brand_name;
            findModel.category_name    =     req.body.category_name || findModel.category_name;
            findModel.category_info    =     req.body.category_info || findModel.category_info;
            findModel.brand_info    =     req.body.brand_info || findModel.brand_info;
            findModel.slugs    =     newslug || findModel.slugs;
            findModel.model_image =     req.body.model_image ||  findModel.model_image;

        await findModel.save();
        res.status(200).json({status:true , message:'updation success' , data : findModel })
        }

        else{
            res.status(500).json({status:false , message:'updation failed'})
        }


    }
    catch(err){
        res.status(406).json({status:false , error:err})
    }
}

const modelDelete = async (req,res) =>{
    try{

        const findDelete = await ModelData.findByIdAndDelete({_id:req.params.id});
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


const modelPatch = async (req,res) =>{
    try{
  
        const findDelete = await ModelData.updateOne({_id:req.params.id} , {
            $set : req.body
        });
        if(findDelete){
            res.status(200).json({status:true , message:'Updation success'})
        }
        else{
            res.status(500).json({status:false , message:'Updation failed'})
        }
  
    }
    catch(err){
        res.status(406).json({status:false , error:err})
    }
  }


const filterWithCategoryGet = async (req,res) =>{
    try{
            console.log(req.params.category_id)
            const findModel = await BrandData.find({
                
                "$and" : [{category_info : req.params.category_id},{state : true}]
            
            });
            if(findModel){
                res.status(200).json({status:true , message:'success' , data : findModel })
            }
            else{
                res.status(500).json({status:false , message:'failed'})
            }

    }
    catch(err){
        res.status(406).json({status:false , error:err})
    }
}

const filterWithBrandGet = async (req,res) =>{
    try{
            console.log(req.params.brand_id)
            const findModel = await ModelData.find({
                "$and" : [{brand_info : req.params.brand_id},{state : true}]
            });
            if(findModel){
                res.status(200).json({status:true , message:'success' , data : findModel })
            }
            else{
                res.status(500).json({status:false , message:'failed'})
            }

    }
    catch(err){
        res.status(406).json({status:false , error:err})
    }
}


const searchGet = async (req,res) =>{
    try{
            console.log(req.params.search)
            const findModel = await ModelData.aggregate([


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
                        from : BrandData.collection.name,
                        let :  { bid : '$brand_info' } ,
                        pipeline : [
                            {
                                $match : {
                                    $expr : {
                                        $and: [
                                            {
                                              $eq: ["$_id", "$$bid"]
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
                        as : 'current_brands'
                    },
                }
                ,
                {
                    $lookup : {
                        from : CategoryData.collection.name,
                        let :  { cid : '$category_info' } ,
                        pipeline : [
                            {
                                $match : {
                                    $expr : {
                                        $and: [
                                            {
                                              $eq: ["$_id", "$$cid"]
                                            },
                                          ],
                                    }
                                }
                            },
                            {
                                $project : {
                                    
                                    brand_name : 0,
                                    brand_info :0,
                                    __v : 0,
                                    slugs : 0,
                                    createdAt : 0,
                                    updatedAt : 0,
                                    state: 0 ,
                                    category_image : 0,
                                    
                                }
                            }
                        ],
                        as : 'current_category'
                    },
                },

                {
                    $match : {
                        $or : [
                            { "model_name" : {$regex:req.params.search}},
                            { "current_category" : {$regex:req.params.search}},
                            { "current_brand" : {$regex:req.params.search}},
                        ]
                    }
                    }
                   

                ,

            ])
            if(findModel){
                res.status(200).json({status:true , message:'success' , data : findModel })
            }
            else{
                res.status(500).json({status:false , message:'failed'})
            }

    }
    catch(err){
        res.status(406).json({status:false , error:err})
    }
}


module.exports = {modelGet,modelPost,modelPut,modelDelete , filterWithCategoryGet, searchGet,modelPatch , filterWithBrandGet};


