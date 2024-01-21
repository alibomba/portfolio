import multer, { MulterError } from 'multer';

const storage = multer.memoryStorage();

const cvUpload = multer({
    storage,
    limits: { fileSize: 3 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['application/pdf', 'application/x-pdf', 'application/x-bzpdf', 'application/x-gzpdf', 'application/octet-stream'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            cb(new MulterError('LIMIT_UNEXPECTED_FILE'));
        } else {
            cb(null, true);
        }
    }
}).single('cv');

export default cvUpload;