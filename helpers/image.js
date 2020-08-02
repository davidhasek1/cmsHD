const fs = require('fs');

const deleteImgFile = (imgPath) => {
    fs.unlink(imgPath, (err) => {
        if(err){
            throw new Error('Deleteing file failed');
        }
    })
}

exports.deleteImgFile = deleteImgFile;