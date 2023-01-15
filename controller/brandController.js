const filedelete = require("../helper/filedelete");
const BrandData = require("../models/brandSchema");
var slugify = require('slugify');
var randomstring = require('randomstring');

const brandGet = async (req, res) => {
  try {
    const findBrand = await BrandData.find()
      .populate("category_info")
      .select("-__v");
    if (findBrand) {
      res
        .status(200)
        .json({ status: true, message: "success", data: findBrand });
    } else {
      res.status(500).json({ status: false, message: "failed" });
    }
  } catch (err) {
    res.status(406).json({ status: false, error: err });
  }
};

const brandPost = async (req, res) => {
  try {

    console.log('======= brandPost =======');
    console.log(req.body , '======= brandPost =======');
    let { brand_name,brand_image, category_info, slugs } = req.body;
   

    if (!brand_name || !category_info) {
        return res.status(400).json({ status: false, message: "failed : some data missing" });
    }

    /* slug code */
    let newslug
    if(req.body.slugs){
        newslug  = req.body.slugs.split(" ").join("-");
    }
    console.log(newslug, '======= 000');
    const slugVerify = await BrandData.find({slugs:newslug}).countDocuments();
    console.log(slugVerify , 'slug status')
    if(newslug && slugVerify>0){
        return res.status(408).json({status:false , message:'failed : slug already used'})
    }

    
    else {

      /* slug code phase - 2 */
      if(!newslug || slugVerify==0){
       console.log(newslug , 'process called 02')
       newslug = slugify(newslug || slugify(req.body.brand_name)+'-'+randomstring.generate(4).toLocaleLowerCase() );
       }

      // let file1 = null;
      // if(req.file){
      //     file1 = process.env.SERVER_FILEUPLOAD_URL+req.file.filename;
      // }



      const findBrand = new BrandData({
        brand_name,
        category_info,
        brand_image,
        slugs: newslug
      });
      await findBrand.save();
      res.status(200).json({ status: true, message: "success", data: findBrand });
      
    }
  } 
  
  catch (err) {
    res.status(406).json({ status: false, error: err });
  }
};

const brandPut = async (req, res) => {
  try {
    const findBrand = await BrandData.findById({ _id: req.params.id });

    if (findBrand) {

      // let file1;
      // if (req.file) {
      //   file1 = process.env.SERVER_FILEUPLOAD_URL + req.file.filename;
      //   if (findBrand.brand_image) {filedelete(findBrand.brand_image);}
      // }


    /* slug code */
    let newslug
    if(req.body.slugs){
        newslug  = req.body.slugs.split(" ").join("-");
    }
    const slugVerify = await BrandData.find({slugs:newslug}).countDocuments();
    switch (newslug) {
        case newslug === findBrand.slugs:
            break;
        case slugVerify > 0 : 
             res.status(408).json({status:false , message:'failed : slug already used'})
            break;
    }



      findBrand.brand_name = req.body.brand_name || findBrand.brand_name;
      findBrand.category_name = req.body.category_name || findBrand.category_name;
      findBrand.category_info = req.body.category_info || findBrand.category_info;
      findBrand.slugs = newslug || findBrand.slugs;
      findBrand.brand_image = req.body.brand_image || findBrand.brand_image;

      await findBrand.save();
      res.status(200).json({ status: true, message: "updation success", data: findBrand });

    } 

    else {
      res.status(500).json({ status: false, message: "updation failed" });
    }


  } 

  catch (err) {
    res.status(406).json({ status: false, error: err });
  }
};


const brandPatch = async (req,res) =>{
  try{

      const findDelete = await BrandData.updateOne({_id:req.params.id} , {
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


const brandDelete = async (req, res) => {
  try {
    const findDelete = await BrandData.findByIdAndDelete({
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

module.exports = { brandGet, brandPost, brandPut, brandDelete , brandPatch };
