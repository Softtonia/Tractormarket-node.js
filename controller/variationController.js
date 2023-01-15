const {VariationData,VariationTypeData} = require("../models/variationSchema")



const variationGet = async (req,res) =>{
    try{
        let findVariation = await VariationData.find().populate('category_info');

        if(findVariation){
            res.status(200).json({status:true , message:'success' , data : findVariation })
        }
        else{
            return res.status(506).json({status:false , message:'failed'})
        }

    }
    catch(err){
        res.status(500).json({status:false , error:err})
    }
}


const variationCategoryGet = async (req,res) =>{
    try{
        let findVariation = await VariationData.find({category_info : req.params.category_id}).select('-category_info -createdAt -updatedAt -_id');

        if(findVariation){
            res.status(200).json({status:true , message:'success' , data : findVariation })
        }
        else{
            return res.status(506).json({status:false , message:'failed'})
        }

    }
    catch(err){
        res.status(500).json({status:false , error:err})
    }
}


const variationPost = async (req,res) =>{
    try{


        let {category_info} = req.body;

        if(!category_info){
            return res.status(400).json({status:false , message:'failed : category info required'});
        }

        else{

        let count = await VariationData.find({category_info : category_info}).countDocuments();
        if(count>0){
            return res.status(406).json({status:false , message:'failed : variation for category already created'});
        }

        else{
            let newVariation = new VariationData(
                req.body
            );
            await newVariation.save();
            if(newVariation){
                res.status(200).json({status:true , message:'success' , data : newVariation })
            }
            else{
                return res.status(506).json({status:false , message:'failed'})
            }
        }


        
        }

    }
    catch(err){
        res.status(500).json({status:false , error:err})
    }
}

const variationPut = async (req,res) =>{
    try{
        let findVariation = await VariationData.updateOne({_id:req.params.id} , 
            {
                $set : req.body
            }
            );


            if(findVariation){
                res.status(200).json({status:true , message:'updation success' , data : findVariation })
            }
            else{
                return res.status(506).json({status:false , message:'updation failed'})
            }

    }
    catch(err){
        res.status(500).json({status:false , error:err})
    }
}


const variationDelete = async (req,res) =>{
    try{
        let findVariation = await VariationData.findByIdAndDelete({_id:req.params.id})

        if(findVariation){
            res.status(200).json({status:true , message:'deletion success'})
        }
        else{
            return res.status(506).json({status:false , message:'deletion failed'})
        }

    }
    catch(err){
        res.status(500).json({status:false , error:err})
    }
}


const variationTypeGet = async (req,res) =>{
    try{
        let findVariation;
        if(req.params.id){
        findVariation = await VariationTypeData.find({category_info : req.params.id}).select('').populate('category_info');

        }
       else{
        findVariation = await VariationTypeData.find().select('').populate('category_info');
       }

        if(findVariation){
            res.status(200).json({status:true , message:'success' , data : findVariation })
        }
        else{
            return res.status(506).json({status:false , message:'failed'})
        }

    }
    catch(err){
        res.status(500).json({status:false , error:err})
    }
}


const variationTypePost = async (req,res) =>{
    try{

        console.log(req.body , '== req.body===')
        let {category_info,variation_name,variation_input,variation_select_data} = req.body;
        if(!category_info || !variation_name || !variation_input){
            return res.status(400).json({status:false , message:'failed : some data required'});
        }

        let count = await VariationTypeData.find({
            $and : [
                {category_info : category_info},
                {variation_name : variation_name.toLowerCase()}
            ]
        }).countDocuments();

        console.log(count , 'count')
        if(count>0){
            return res.status(406).json({status:false , message:'failed : variation name for category already created'});
        }
        

        else{
            console.log('entered in ')
            let vname = req.body.variation_name.toLowerCase();

            console.log(vname , 'entered in ')

            let newVariation = new VariationTypeData(
                {
                    category_info,
                    variation_name : vname,
                    variation_input,
                    variation_select_data

                }
            );
            await newVariation.save();

            console.log(newVariation , 'entered in 01')
           
            res.status(200).json({status:true , message:'success' , data : newVariation })
          
        }
        
 

    }
    catch(err){
        res.status(500).json({status:false , error:err})
    }
}

const variationTypePut = async (req,res) =>{
    try{
        let findVariation = await VariationTypeData.updateOne({_id:req.params.id} , 
            {
                $set : req.body
            }
            );


            if(findVariation){
                res.status(200).json({status:true , message:'updation success' , data : findVariation })
            }
            else{
                return res.status(506).json({status:false , message:'updation failed'})
            }

    }
    catch(err){
        res.status(500).json({status:false , error:err})
    }
}


const variationTypeDelete = async (req,res) =>{
    try{
        let findVariation = await VariationTypeData.findByIdAndDelete({_id:req.params.id})

        if(findVariation){
            res.status(200).json({status:true , message:'deletion success'})
        }
        else{
            return res.status(506).json({status:false , message:'deletion failed'})
        }

    }
    catch(err){
        res.status(500).json({status:false , error:err})
    }
}


const variationTypePatch = async (req,res) =>{
    try{
  
        const findDelete = await VariationTypeData.updateOne({_id:req.params.id} , {
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




module.exports = {variationGet,variationPost,variationPut,variationDelete,variationCategoryGet,variationTypeGet,variationTypePost,variationTypePut,variationTypeDelete,variationTypePatch}