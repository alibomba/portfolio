import multer, {MulterError} from "multer";
import path from "path";
import {v4} from 'uuid';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/../public/pfp`);
    },
    filename: (req, file, cb) => {
        const fileName = `${v4()}${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
});

const upload = multer({storage, limits: {fileSize: 2 * 1024 * 1024}, fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    if(!allowedMimeTypes.includes(file.mimetype)){
        cb(new MulterError('LIMIT_UNEXPECTED_FILE'));
    }
    else{
        cb(null, true);
    }
}}).single('image');



export default upload;