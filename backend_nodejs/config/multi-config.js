const multer = require('multer');

///////////////// AUDIO

const MIME_TYPES = {
    'audio/mp3': 'mp3',
    'audio/mp4': 'mp4',
    'audio/wav': 'wav',
    'audio/m4a': 'm4a',
};

const maxSize = 900000000;


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'Storage/audios');
        // callback(null, 'config');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage, limits: {fileSize: maxSize }}).single('audio');




///////////////// IMAGES
/*
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage}).single('image');*/
