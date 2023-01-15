
var slug = require('slug');
const filedelete = require("../helper/filedelete");
const ProductData = require('../models/productSchema');
var slugify = require('slugify');

const productGet = async (req,res) =>{
    try{
        
            const findProduct = await ProductData.find();

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


        /* slug code phase - 1 */
        // let newslug
        // if(req.body.slugs){
        //     newslug  = req.body.slugs.split(" ").join("-");
        // }
        // console.log(newslug, '======= 000')
        // const slugVerify = await ProductData.find({slugs:newslug}).countDocuments();
        // console.log(slugVerify , 'slug status')
        // if(newslug && slugVerify>0){
        //     return res.status(408).json({status:false , message:'failed : slug already used'})
        // }

        else{

            // let file1;

            // if(req.file){
            //     file1 = process.env.SERVER_FILEUPLOAD_URL+req.file.filename;
            // }

            // let gallery = [front_image, back_image, left_image, right_image,];

  
           /* slug code phase - 2 */
        //    if(!newslug || slugVerify==0){
        //     console.log(newslug , 'process called 02')
        //     newslug = slugify(newslug || slugify(req.body.model_name)+'-'+randomstring.generate(4).toLocaleLowerCase() );
        //     }

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

module.exports = {productGet,productPost,productPut,productDelete};


