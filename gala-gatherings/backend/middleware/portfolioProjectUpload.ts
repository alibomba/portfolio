import multer, { MulterError } from 'multer';
import path from 'path';
import { v4 } from 'uuid';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/../public/portfolio`);
    },
    filename: (req, file, cb) => {
        const fileName = `${v4()}${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
});

const portfolioProjectUpload = multer({
    storage,
    limits: {
        fileSize: 3 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpg', 'image/png', 'image/jpeg'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            cb(new MulterError('LIMIT_UNEXPECTED_FILE'));
        }
        else {
            cb(null, true);
        }
    }
}).fields([{ name: 'title' }, { name: 'content' }, { name: 'images' }]);

export default portfolioProjectUpload;