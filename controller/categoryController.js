const filedelete = require("../helper/filedelete");
const CategoryData = require("../models/categorySchema");
// var slug = require('slug')
var slugify = require('slugify');
var randomstring = require('randomstring');


const categoryGet = async (req,res) =>{
    try{

            const findCategory = await CategoryData.find().select('-__v');
            if(findCategory){
                res.status(200).json({status:true , message:'success' , data : findCategory })
            }
            else{
                res.status(500).json({status:false , message:'failed'})
            }

    }
    catch(err){
        res.status(406).json({status:false , error:err})
    }
}

const categoryPost = async (req,res) =>{
    try{
        console.log(req.body);

        let {category_name,category_image,slugs} = req.body;

        if(!category_name){
            return res.status(400).json({status:false , message:'failed : some data missing'})
        }

    /* slug code */
    let newslug
    if(req.body.slugs){
        newslug  = req.body.slugs.split(" ").join("-");
    }
    
    const slugVerify = await CategoryData.find({slugs:newslug}).countDocuments();
    console.log(slugVerify , 'slug status')
    if(newslug && slugVerify>0){
        return res.status(408).json({status:false , message:'failed : slug already used'})
    }

        else{
      
      /* slug code phase - 2 */
      if(!newslug || slugVerify==0){
        console.log(newslug , 'process called 02')
        newslug = slugify(newslug || slugify(req.body.category_name)+'-'+randomstring.generate(4).toLocaleLowerCase() );
        }


            
            const newCategory = new CategoryData({
                category_name, 
                category_image,
                slugs : newslug
            })

            await newCategory.save();
            return res.status(200).json({status:true , message:'success' , data:newCategory});
        }
    }
    catch(err){
        return res.status(404).json({status:false , error:err});
    }
}





const categoryPut = async (req,res) =>{
    try{

        const findCategory = await CategoryData.findById({_id:req.params.id});

        if(findCategory){
            
            /* slug code */
            let newslug
            if(req.body.slugs){
                newslug  = req.body.slugs.split(" ").join("-");
            }
            const slugVerify = await CategoryData.find({slugs:newslug}).countDocuments();
            switch (newslug) {
                case newslug === findCategory.slugs:
                    
                    break;
            
                case slugVerify > 0 : 
                     res.status(408).json({status:false , message:'failed : slug already used'})
                    break;
            }


        findCategory.category_name    =     req.body.category_name || findCategory.category_name;
        findCategory.category_image =     req.body.category_image ||  findCategory.category_image;
        findCategory.slugs    =   newslug   || findCategory.slugs;

        await findCategory.save();
        res.status(200).json({status:true , message:'updation success' , data : findCategory })
        }

        else{
            res.status(500).json({status:false , message:'updation failed'})
        }


    }
    catch(err){
        res.status(406).json({status:false , error:err})
    }
}

const categoryDelete = async (req,res) =>{
    try{

        const findDelete = await CategoryData.findByIdAndDelete({_id:req.params.id});
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

const categoryPatch = async (req,res) =>{
    try{

        const findDelete = await CategoryData.updateOne({_id:req.params.id} , {
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

module.exports = {categoryGet,categoryPost,categoryPut,categoryDelete , categoryPatch};


