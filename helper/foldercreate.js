

const fs = require('fs');
const path = require('path')

const publicDirectoryPath = path.join(__dirname, '../public/uploads');

const foldercreate = (folder_name) =>{
    console.log(folder_name,'calledled')
    fs.mkdirSync(  `${publicDirectoryPath}/${folder_name}` , (err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log('=== folder created ===')
        }
    })

    console.log(publicDirectoryPath , 'publicDirectoryPathpublicDirectoryPath')
    return 'process done'
}

module.exports = foldercreate;