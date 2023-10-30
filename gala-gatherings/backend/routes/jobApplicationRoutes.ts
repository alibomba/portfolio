import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import jobApplicationUpload from '../middleware/jobApplicationUpload';
import { MulterError } from 'multer';
import deleteFile from '../utilities/deleteFile';
import jwtAuthentication from '../middleware/jwtAuthentication';

const jobApplicationRoutes: Router = Router();
const prisma = new PrismaClient();

jobApplicationRoutes.post('/job-application', async (req: Request, res: Response) => {
    jobApplicationUpload(req, res, async err => {
        if (err) {
            if (err instanceof MulterError) {
                if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                    return res.status(422).json({ message: 'Dozwolone typy plików to między innymi: .pdf, .docx, .txt' });
                }
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(422).json({ message: 'Maksymalny rozmiar pliku to 2MB' });
                }
            }
            else {
                return res.sendStatus(500);
            }
        }
        const { firstName, lastName, email, phoneNumber, jobPosition, details } = req.body;
        let cvFile;
        let filePath;
        if (req.files && typeof req.files === 'object' && 'cvFile' in req.files) {
            cvFile = req.files['cvFile'][0];
            filePath = `${__dirname}/../public/cvs/${cvFile.filename}`;
        }
        if (!firstName) {
            deleteFile(filePath);
            return res.status(422).json({ message: 'Imię jest wymagane' });
        }
        if (firstName.length > 100) {
            deleteFile(filePath);
            return res.status(422).json({ message: 'Imię może mieć maksymalnie 100 znaków' });
        }
        if (!lastName) {
            deleteFile(filePath);
            return res.status(422).json({ message: 'Nazwisko jest wymagane' });
        }
        if (lastName.length > 100) {
            deleteFile(filePath);
            return res.status(422).json({ message: 'Nazwisko może mieć maksymalnie 100 znaków' });
        }
        if (!email) {
            deleteFile(filePath);
            return res.status(422).json({ message: 'Adres e-mail jest wymagany' });
        }
        if (email.length > 55) {
            deleteFile(filePath);
            return res.status(422).json({ message: 'Adres e-mail może mieć maksymalnie 55 znaków' });
        }
        const emailRegex = new RegExp(/^[\w\.-]+@[\w\.-]+\.\w+$/);
        if (!emailRegex.test(email)) {
            deleteFile(filePath);
            return res.status(422).json({ message: 'Podaj poprawny adres e-mail' });
        }
        if (!phoneNumber) {
            deleteFile(filePath);
            return res.status(422).json({ message: 'Numer telefonu jest wymagany' });
        }
        if (phoneNumber.length > 30) {
            deleteFile(filePath);
            return res.status(422).json({ message: 'Numer telefonu może mieć maksymalnie 30 znaków' });
        }
        if (!jobPosition) {
            deleteFile(filePath);
            return res.status(422).json({ message: 'Pozycja w firmie jest wymagana' });
        }
        if (jobPosition.length > 255) {
            deleteFile(filePath);
            return res.status(422).json({ message: 'Pozycja w firmie może mieć maksymalnie 255 znaków' });
        }
        if (details && details.length > 700) {
            deleteFile(filePath);
            return res.status(422).json({ message: 'Sekcja o sobie może mieć maksymalnie 700 znaków' });
        }

        try {
            await prisma.jobApplication.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    cvUrl: cvFile ? cvFile.filename : undefined,
                    jobPosition,
                    details: details || undefined
                }
            });
            res.sendStatus(204);
        } catch (err) {
            res.sendStatus(500);
        }

    });
});

jobApplicationRoutes.get('/job-applications', jwtAuthentication, async (req: Request, res: Response) => {
    const { howManyParam } = req.query;
    if (!howManyParam) return res.status(422).json({ message: 'Ilość jest wymagana' });
    const howMany = parseInt(howManyParam as string);
    if (isNaN(howMany)) return res.status(422).json({ message: 'Ilość musi być liczbą całkowitą' });
    if (howMany < 1) return res.status(422).json({ message: 'Ilość nie może być mniejsza od 1' });
    let isMore;
    if (await prisma.jobApplication.count() <= howMany) {
        isMore = false;
    }
    else {
        isMore = true;
    }
    const applications = await prisma.jobApplication.findMany({ take: howMany, orderBy: { sentAt: 'desc' } });
    res.json({
        applications,
        isMore
    });
});

jobApplicationRoutes.get('/job-applications/:id', jwtAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    const application = await prisma.jobApplication.findUnique({ where: { id } });
    if (!application) return res.sendStatus(404);
    res.json(application);
});


export default jobApplicationRoutes;