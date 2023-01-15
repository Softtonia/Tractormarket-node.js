const fs = require('fs');


const filedelete = (filename) =>{
    fs.unlink(filename.replace(process.env.SERVER_FILEUPLOAD_URL , `public/uploads/`) , (err)=>{
        if(err){
            console.log(`file deletion error:${err}`);
        }
        else{
            console.log(`${filename} file deleted`);
        }
    })
}

module.exports = filedelete;