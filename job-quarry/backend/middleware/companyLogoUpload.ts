import multer, { MulterError } from "multer";

const storage = multer.memoryStorage();

const companyLogoUpload = multer({
    storage,
    limits: { fileSize: 3 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpg', 'image/png', 'image/jpeg'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            cb(new MulterError('LIMIT_UNEXPECTED_FILE'));
        }
        else {
            cb(null, true);
        }
    }
}).single('logo');

export default companyLogoUpload;