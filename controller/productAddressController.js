const filedelete = require("../helper/filedelete");
var slugify = require('slugify');
var randomstring = require('randomstring');
const { StateListData, DistrictListData, BlocksListData } = require("../models/productAddressSchema");


const statesGet = async (req,res) =>{
    try{
            const findState = await StateListData.find().select('-__v');
            if(findState){
                res.status(200).json({status:true , message:'success' , data : findState })
            }
            else{
                res.status(500).json({status:false , message:'failed'})
            }

    }
    catch(err){
        res.status(406).json({status:false , error:err})
    }
}

const statesPost = async (req,res) =>{
    try{
        console.log(req.body);

        let {state_name,state_image} = req.body;
        if(!state_name){
            return res.status(400).json({status:false , message:'failed : some data missing'})
        }

        /* slug code */
        let newslug
        if(req.body.slugs){
            newslug  = req.body.slugs.split(" ").join("-");
        }
        console.log(newslug, '======= 000')
        const slugVerify = await StateListData.find({slugs:newslug}).countDocuments();
        console.log(slugVerify , 'slug status')
        if(newslug && slugVerify>0){
            return res.status(408).json({status:false , message:'failed : slug already used'})
        }

        else{
      
           /* slug code phase - 2 */
           if(!newslug || slugVerify==0){
            console.log(newslug , 'process called 02')
            newslug = slugify(newslug || slugify(req.body.state_name)+'-'+randomstring.generate(4).toLocaleLowerCase() );
            }

            // let file1 = null;
            // if(req.file){
            //     file1 = process.env.SERVER_FILEUPLOAD_URL+req.file.filename;
            // }
            
            const newCategory = new StateListData({
                state_name, 
                state_image,
                slugs : newslug
            })

            await newCategory.save();
            return res.status(200).json({status:true , message:'success' , data:newCategory});
        }
    }
    catch(err){
        return res.status(406).json({status:false , error:err});
    }
}

const statesPut = async (req,res) =>{
    try{

        const findState = await StateListData.findById({_id:req.params.id});

        if(findState){
            
            // let file1;
            // if(req.file){
            //     file1 = process.env.SERVER_FILEUPLOAD_URL+req.file.filename;
            //     if(findState.state_image){filedelete(findState.state_image);}
            // }

            /* slug code */
            let newslug
            if(req.body.slugs){
                newslug  = req.body.slugs.split(" ").join("-");
            }
            const slugVerify = await StateListData.find({slugs:newslug}).countDocuments();
            switch (newslug) {
                case newslug === findState.slugs:
                    
                    break;
            
                case slugVerify > 0 : 
                     res.status(408).json({status:false , message:'failed : slug already used'})
                    break;
            }

        findState.state_name    =     req.body.state_name || findState.state_name;
        findState.state_image =     req.body.state_image ||  findState.state_image;
        findState.slugs    =   newslug   || findState.slugs;

        await findState.save();
        res.status(200).json({status:true , message:'updation success' , data : findState })
        }

        else{
            res.status(500).json({status:false , message:'updation failed'})
        }


    }
    catch(err){
        res.status(406).json({status:false , error:err})
    }
}

const statesDelete = async (req,res) =>{
    try{

        const findDelete = await StateListData.findByIdAndDelete({_id:req.params.id});
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



const statesPatch = async (req,res) =>{
    try{
  
        const findDelete = await StateListData.updateOne({_id:req.params.id} , {
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



const districtGet = async (req, res) => {
    try {
      const findDistrict = await DistrictListData.find()
        .populate("state_info")
        .select("-__v");
      if (findDistrict) {
        res
          .status(200)
          .json({ status: true, message: "success", data: findDistrict });
      } else {
        res.status(500).json({ status: false, message: "failed" });
      }
    } catch (err) {
      res.status(406).json({ status: false, error: err });
    }
  };
  
const districtPost = async (req, res) => {
    try {
      let { district_name, state_name, state_info, district_image, slugs } = req.body;
  
      if (!district_name) {
          return res.status(400).json({ status: false, message: "failed : some data missing" });
      }
  
      /* slug code */
      let newslug
      if(req.body.slugs){
          newslug  = req.body.slugs.split(" ").join("-");
      }
      console.log(newslug, '======= 000')
      const slugVerify = await DistrictListData.find({slugs:newslug}).countDocuments();
      console.log(slugVerify , 'slug status')
      if(newslug && slugVerify>0){
          return res.status(408).json({status:false , message:'failed : slug already used'})
      }
  
      
      else {
  
        /* slug code phase - 2 */
        if(!newslug || slugVerify==0){
         console.log(newslug , 'process called 02')
         newslug = slugify(newslug || slugify(req.body.district_name)+'-'+randomstring.generate(4).toLocaleLowerCase() );
         }
  
        const findDistrict = new DistrictListData({
          district_name,
          state_name,
          state_info,
          district_image,
          slugs: newslug
        });
        await findDistrict.save();
        res.status(200).json({ status: true, message: "success", data: findDistrict });
        
      }
    } 
    
    catch (err) {
      res.status(406).json({ status: false, error: err });
    }
};

const districtPut = async (req, res) => {
    try {
      const findDistrict = await DistrictListData.findById({ _id: req.params.id });
  
      if (findDistrict) {
  
      /* slug code */
      let newslug
      if(req.body.slugs){
          newslug  = req.body.slugs.split(" ").join("-");
      }
      const slugVerify = await DistrictListData.find({slugs:newslug}).countDocuments();
      switch (newslug) {
          case newslug === findDistrict.slugs:
              break;
          case slugVerify > 0 : 
               res.status(408).json({status:false , message:'failed : slug already used'})
              break;
      }

        findDistrict.district_name = req.body.district_name || findDistrict.district_name;
        findDistrict.state_name = req.body.state_name || findDistrict.state_name;
        findDistrict.state_info = req.body.state_info || findDistrict.state_info;
        findDistrict.slugs = newslug || findDistrict.slugs;
        findDistrict.district_image = req.body.district_image || findDistrict.district_image;
  
        await findDistrict.save();
        res.status(200).json({ status: true, message: "updation success", data: findDistrict });
  
      } 
  
      else {
        res.status(500).json({ status: false, message: "updation failed" });
      }
  
  
    } 
  
    catch (err) {
      res.status(406).json({ status: false, error: err });
    }
};

const districtDelete = async (req, res) => {
    try {
      const findDelete = await DistrictListData.findByIdAndDelete({
        _id: req.params.id,
      });
      if (findDelete) {
        res.status(200).json({ status: true, message: "deletion success" });
      } else {
        res.status(500).json({ status: false, message: "deletion failed" });
      }
    } catch (err) {
      res.status(406).json({ status: false, error: err });
    }
};


const districtPatch = async (req,res) =>{
    try{
  
        const findDelete = await DistrictListData.updateOne({_id:req.params.id} , {
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



// const blocksGet = async (req,res) =>{
//     try{

//             const findBlocks = await BlocksListData.find().populate('state_info district_info').select('-__v');
//             if(findBlocks){
//                 res.status(200).json({status:true , message:'success' , data : findBlocks })
//             }
//             else{
//                 res.status(500).json({status:false , message:'failed'})
//             }

//     }
//     catch(err){
//         res.status(406).json({status:false , error:err})
//     }
// }


const blocksGet = async (req,res) =>{
    try{

            const findBlocks = await BlocksListData.aggregate([
                {
                    $lookup : {
                        from : DistrictListData.collection.name,
                        let :  { sid : '$state_info' } ,
                        pipeline : [
                            {
                                $match : {
                                    $expr : {
                                        $and: [
                                            {
                                              $eq: ["$state_info", "$$sid"]
                                            },
                                          ],
                                    }
                                }
                            },
                            {
                                $project : {
                                    
                                    state_name : 0,
                                    state_info :0,
                                    __v : 0,
                                    slugs : 0,
                                    createdAt : 0,
                                    updatedAt : 0,
                                    state: 0 ,
                                    district_image : 0,
                                }
                            }
                        ],
                        as : 'districts_aviable'
                    },


                },
                {
                    $lookup : {
                        from : DistrictListData.collection.name,
                        let :  { bid : '$district_info' } ,
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
                                    
                                    state_name : 0,
                                    state_info :0,
                                    __v : 0,
                                    slugs : 0,
                                    createdAt : 0,
                                    updatedAt : 0,
                                    state: 0 ,
                                    district_image : 0,
                                }
                            }
                        ],
                        as : 'current_districts'
                    },
                }
                ,
                {
                    $lookup : {
                        from : StateListData.collection.name,
                        let :  { sid : '$state_info' } ,
                        pipeline : [
                            {
                                $match : {
                                    $expr : {
                                        $and: [
                                            {
                                              $eq: ["$_id", "$$sid"]
                                            },
                                          ],
                                    }
                                }
                            },
                            {
                                $project : {
                                    
                                    district_name : 0,
                                    district_info :0,
                                    __v : 0,
                                    slugs : 0,
                                    createdAt : 0,
                                    updatedAt : 0,
                                    state: 0 ,
                                    state_image : 0,
                                    
                                }
                            }
                        ],
                        as : 'current_state'
                    },
                }
            ]);
            if(findBlocks){
                res.status(200).json({status:true , message:'success' , data : findBlocks })
            }
            else{
                res.status(500).json({status:false , message:'failed'})
            }

    }
    catch(err){
        res.status(406).json({status:false , error:err})
    }
}


const blocksPost = async (req,res) =>{
    try{
        let {district_name,
            blocks_name,
            blocks_image,
            state_name,
            state_info,
            district_info,
            slugs} = req.body;

        if(!blocks_name){
        res.status(400).json({status:false , message:'failed : some data missing'})
        }

        /* slug code phase - 1 */
        let newslug
        if(req.body.slugs){
            newslug  = req.body.slugs.split(" ").join("-");
        }
        console.log(newslug, '======= 000')
        const slugVerify = await BlocksListData.find({slugs:newslug}).countDocuments();
        console.log(slugVerify , 'slug status')
        if(newslug && slugVerify>0){
            return res.status(408).json({status:false , message:'failed : slug already used'})
        }


        else{
           /* slug code phase - 2 */
           if(!newslug || slugVerify==0){
            console.log(newslug , 'process called 02')
            newslug = slugify(newslug || slugify(req.body.blocks_name)+'-'+randomstring.generate(4).toLocaleLowerCase() );
            }
            // let file1 = null;
            // if(req.file){
            //     file1 = process.env.SERVER_FILEUPLOAD_URL+req.file.filename;
            // }

            const findBlocks = new BlocksListData({
                district_name,
                blocks_name,
                state_name,
                state_info,
                district_info,
                blocks_image,
                slugs : newslug 

            });
            await findBlocks.save();
           
            res.status(200).json({status:true , message:'success' , data : findBlocks })
           

        }

    }
    catch(err){
        res.status(406).json({status:false , error:err})
    }
}


const blocksPut = async (req,res) =>{
    try{

        const findBlocks = await BlocksListData.findById({_id:req.params.id});

        if(findBlocks){

            // let file1;
            // if(req.file){
            //     file1 = process.env.SERVER_FILEUPLOAD_URL+req.file.filename;
            //     if(findBlocks.blocks_image){filedelete(findBlocks.blocks_image);}
            // }


            /* slug code */
            let newslug
            if(req.body.slugs){
                newslug  = req.body.slugs.split(" ").join("-");
            }
            const slugVerify = await BlocksListData.find({slugs:newslug}).countDocuments();
            switch (newslug) {
                case newslug === findBlocks.slugs:
                    break;
                case slugVerify > 0 : 
                     res.status(408).json({status:false , message:'failed : slug already used'})
                    break;
            }

        

            findBlocks.blocks_name    =     req.body.blocks_name || findBlocks.blocks_name;
            findBlocks.district_name    =     req.body.district_name || findBlocks.district_name;
            findBlocks.state_name    =     req.body.state_name || findBlocks.state_name;
            findBlocks.state_info    =     req.body.state_info || findBlocks.state_info;
            findBlocks.district_info    =     req.body.district_info || findBlocks.district_info;
            findBlocks.slugs    =     newslug || findBlocks.slugs;
            findBlocks.blocks_image =     req.body.blocks_image ||  findBlocks.blocks_image;

        await findBlocks.save();
        res.status(200).json({status:true , message:'updation success' , data : findBlocks })
        }

        else{
            res.status(500).json({status:false , message:'updation failed'})
        }


    }
    catch(err){
        res.status(406).json({status:false , error:err})
    }
}

const blocksDelete = async (req,res) =>{
    try{

        const findDelete = await BlocksListData.findByIdAndDelete({_id:req.params.id});
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


const blocksPatch = async (req,res) =>{
    try{
  
        const findDelete = await BlocksListData.updateOne({_id:req.params.id} , {
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





const filterWithStateGet = async (req,res) =>{
    try{
            console.log(req.params.state_id)
            const findModel = await DistrictListData.find({state_info : req.params.state_id});
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



module.exports = {statesGet,statesPost,statesPut,statesDelete,districtGet,districtPost,districtPut,districtDelete,
    blocksGet,blocksPost,blocksPut,blocksDelete , filterWithStateGet,statesPatch,districtPatch,blocksPatch
};


