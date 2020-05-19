const fs = require("fs");

const cleaner = async (req, res, next) => {
    fs.unlink(req.file.path, (err) => {
        if(err){
            console.log("Delete error: ", err);
        }else{
            console.log('File deleted: ', req.file.path);
        }
    });

	next();
};

module.exports = cleaner;
