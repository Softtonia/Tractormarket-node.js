
const fs = require('fs');
const path = require('path');
const filedelete = require('./filedelete');

const dirpath = path.join(__dirname , '../public/uploads')


const imgdata = []
const readFile =  (req,res) =>{

    console.log(dirpath); 

    fs.readdir(dirpath , (err , files) =>{

    files.forEach((item)=>{
        imgdata.push(`${process.env.SERVER_FILEUPLOAD_URL}`+item)
    })
    })

    res.status(200).json({status:true , message : 'success' , data:imgdata});

    console.log('last catt'); 
   
    emptyArray();
}

const emptyArray = () =>{
    while (imgdata.length > 0) {
        imgdata.pop();
      }
}


const uploadFile = async (req,res) =>{
    try{

        console.log('called');

            if(req.file){
                console.log(req.file);

                return res.status(200).json({status:true , message : 'success' , data:req.file.filename});

            }
    }
    catch(err){
        console.log(err)
    }
}


const deleteFile = async (req,res) =>{
    try{
        console.log(req.param.filename)
            if(req.param.filename){
              filedelete(process.env.SERVER_FILEUPLOAD_URL+req.param.filename);
                return res.status(200).json({status:true , message : 'deletion success'});
            }
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {readFile,uploadFile,deleteFile};