import multer, { MulterError } from 'multer';
import path from 'path';
import { v4 } from 'uuid';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/../public/cvs`);
    },
    filename: (req, file, cb) => {
        const fileName = `${v4()}${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
})

const jobApplicationUpload = multer({
    storage, limits: { fileSize: 2 * 1024 * 1024 }, fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            cb(new MulterError('LIMIT_UNEXPECTED_FILE'));
        }
        else {
            cb(null, true);
        }
    }
}).fields([{ name: 'firstName' }, { name: 'lastName' }, { name: 'email' }, { name: 'phoneNumber' }, { name: 'jobPosition' }, { name: 'cvFile' }, { name: 'details' }]);

export default jobApplicationUpload;