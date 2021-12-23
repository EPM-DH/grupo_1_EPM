//For the path
const path = require('path');
//For multer 
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/../public/img/users'));
    },
    filename: (req, file, cb) => {
        //Remove all whitespaces between words
        cb(null, `${path.parse(file.originalname).name.replace(/ +/g, "")}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const uploadFile = multer({storage});

module.exports = uploadFile;