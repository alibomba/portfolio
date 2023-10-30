import { Request, Response, Router } from 'express';
import { Location, PrismaClient } from '@prisma/client';
import PaginationResponse from '../types/PaginationResponse';
import jwtAuthentication from '../middleware/jwtAuthentication';
import locationUpload from '../middleware/locationUpload';
import { MulterError } from 'multer';
import deleteFile from '../utilities/deleteFile';

const locationRoutes: Router = Router();
const prisma = new PrismaClient();

const PER_PAGE = 8;

locationRoutes.get('/locations', async (req: Request, res: Response) => {
    let page = req.query.page as string | number;
    if (page) page = +page;
    else page = 1;
    const locationCount = await prisma.location.count();
    const lastPage = Math.ceil(locationCount / PER_PAGE);
    if (page > lastPage) return res.status(404).json({ message: `Jest tylko ${lastPage} stron` });
    const offset = (page - 1) * PER_PAGE;
    const locations = await prisma.location.findMany({ take: PER_PAGE, skip: offset });
    const response: PaginationResponse<Location> = {
        currentPage: page,
        lastPage,
        data: locations
    };
    res.json(response);
});

locationRoutes.get('/locations/:id', jwtAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    const location = await prisma.location.findUnique({ where: { id } });
    if (!location) return res.sendStatus(404);
    res.json(location);
});

locationRoutes.get('/locations-cms', jwtAuthentication, async (req: Request, res: Response) => {
    const { howManyParam } = req.query;
    const howMany = parseInt(howManyParam as string);
    if (isNaN(howMany)) return res.status(422).json({ message: 'Ilość musi być liczbą całkowitą' });
    if (howMany < 1) return res.status(422).json({ message: 'Ilość nie może być mniejsza od 1' });
    let isMore;
    if (await prisma.location.count() <= howMany) isMore = false;
    else isMore = true;
    const locations = await prisma.location.findMany({ take: howMany });
    res.json({
        isMore,
        locations
    });
});

locationRoutes.post('/locations', jwtAuthentication, async (req: Request, res: Response) => {
    locationUpload(req, res, async err => {
        if (err) {
            if (err instanceof MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(422).json({ message: 'Plik może mieć maksymalnie 3MB' });
                }
                else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                    return res.status(422).json({ message: 'Plik musi być obrazem' });
                }
                else {
                    return res.sendStatus(500);
                }
            }
            else {
                return res.sendStatus(500);
            }
        }

        const { name, standard } = req.body;

        let image;
        let imagePath;
        if (req.files && typeof req.files === 'object' && 'image' in req.files) {
            image = req.files['image'][0];
            imagePath = `${__dirname}/../public/locations/${image.filename}`;
        }

        if (!image) {
            return res.status(422).json({ message: 'Obraz jest wymagany' });
        }

        if (!name) {
            deleteFile(imagePath);
            return res.status(422).json({ message: 'Nazwa jest wymagana' });
        }

        if (name.length > 100) {
            deleteFile(imagePath);
            return res.status(422).json({ message: 'Nazwa może mieć maksymalnie 100 znaków' });
        }

        if (!standard) {
            deleteFile(imagePath);
            return res.status(422).json({ message: 'Liczba gwiazdek jest wymagana' });
        }

        const standardInt = parseInt(standard);
        if (isNaN(standardInt)) {
            deleteFile(imagePath);
            return res.status(422).json({ message: 'Liczba gwiazdek musi być liczbą całkowitą' });
        }
        if (standardInt > 5 || standardInt < 1) {
            deleteFile(imagePath);
            return res.status(422).json({ message: 'Liczba gwiazdek musi być większa od 1 i mniejsza od 5' });
        }

        try {
            await prisma.location.create({
                data: {
                    image: image.filename,
                    name,
                    standard: standardInt
                }
            });
            res.sendStatus(201);
        } catch (err) {
            res.sendStatus(500);
        }
    });
});

locationRoutes.put('/locations/:id', jwtAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!await prisma.location.findUnique({ where: { id } })) return res.sendStatus(404);
    locationUpload(req, res, async err => {
        if (err) {
            if (err instanceof MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') return res.status(422).json({ message: 'Obraz może mieć maksymalnie 3MB' });
                else if (err.code === 'LIMIT_UNEXPECTED_FILE') return res.status(422).json({ message: 'Plik musi być obrazem' });
                else return res.sendStatus(500);
            }
            else {
                return res.sendStatus(500);
            }
        }

        const { name, standard } = req.body;

        let image;
        let imagePath;
        if (req.files && typeof req.files === 'object' && 'image' in req.files) {
            image = req.files['image'][0];
            imagePath = `${__dirname}/../public/locations/${image.filename}`;
        }

        if (!name) {
            deleteFile(imagePath);
            return res.status(422).json({ message: 'Nazwa jest wymagana' });
        }

        if (name.length > 100) {
            deleteFile(imagePath);
            return res.status(422).json({ message: 'Nazwa może mieć maksymalnie 100 znaków' });
        }

        if (!standard) {
            deleteFile(imagePath);
            return res.status(422).json({ message: 'Liczba gwiazdek jest wymagana' });
        }

        const standardInt = parseInt(standard);
        if (isNaN(standardInt)) {
            deleteFile(imagePath);
            return res.status(422).json({ message: 'Liczba gwiazdek musi być liczbą całkowitą' });
        }
        if (standardInt > 5 || standardInt < 1) {
            deleteFile(imagePath);
            return res.status(422).json({ message: 'Liczba gwiazdek musi być większa od 1 i mniejsza od 5' });
        }

        try {
            await prisma.location.update({
                where: { id },
                data: {
                    image: image ? image.filename : undefined,
                    name,
                    standard: standardInt
                }
            });
            res.sendStatus(204);
        } catch (err) {
            res.sendStatus(500);
        }
    });
});

locationRoutes.delete('/locations/:id', jwtAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!await prisma.location.findUnique({ where: { id } })) return res.sendStatus(404);
    try {
        await prisma.location.delete({
            where: { id }
        });
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
});

export default locationRoutes;