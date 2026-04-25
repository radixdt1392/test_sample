const multer = require('multer');
const path = require('path');

//Allowed File type
const ALLOWED_TYPE = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'application/pdf': '.pdf'
};
const MAX_SIZE = 2 * 1024 * 1024; // 2MB

//storage - where file should save.

const storage = multer.diskStorage({
    destination: (req, resp, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + ' - ' + file.originalname.replace(/\s/g, '_');
        cb(null, uniqueName);
    }
});

const filefilter = (req, file, cb) => {
    if (ALLOWED_TYPE[file.mimetype]) {
        cb(null, true);
    } else {
        cb(new Error('only JPEG, jpg,png files are allowed'), false);
    }
};


const upload = multer({
    storage: storage,
    fileFilter: filefilter,
    limits: {
        fileSize: MAX_SIZE
    }
});

module.exports = upload;