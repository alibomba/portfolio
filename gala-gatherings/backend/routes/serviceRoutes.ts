import { PrismaClient } from '@prisma/client';
import { Request, Response, Router } from 'express';
import jwtAuthentication from '../middleware/jwtAuthentication';
import serviceUpload from '../middleware/serviceUpload';
import { MulterError } from 'multer';
import deleteFile from '../utilities/deleteFile';

const serviceRoutes: Router = Router();
const prisma = new PrismaClient();

serviceRoutes.get('/featured-offers', async (req: Request, res: Response) => {
    const offers = await prisma.featuredOffer.findMany({
        select: {
            service: true
        }
    });
    if (offers.length === 0) return res.status(404).json({ message: 'Brak polecanych pakietów' });
    res.json(offers);
});

serviceRoutes.get('/services', async (req: Request, res: Response) => {
    const services = await prisma.service.findMany();
    if (services.length === 0) return res.status(404).json({ message: 'Brak usług' });
    res.json(services);
});

serviceRoutes.get('/services/:id', jwtAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    const service = await prisma.service.findUnique({ where: { id }, include: { FeaturedOffer: true } });
    if (!service) return res.status(404).json({ message: 'Usługa nie istnieje' });
    res.json(service);
});

serviceRoutes.post('/services', jwtAuthentication, async (req: Request, res: Response) => {
    serviceUpload(req, res, async err => {
        if (err) {
            if (err instanceof MulterError) {
                if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                    return res.status(422).json({ message: 'Plik musi być obrazem' });
                }
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(422).json({ message: 'Plik może mieć maksymalnie 3MB' });
                }
            }
            else {
                return res.sendStatus(500);
            }
        }
        const { title, description, price, isFeatured } = req.body;
        let image;
        let imagePath;
        if (req.files && typeof req.files === 'object' && 'image' in req.files) {
            image = req.files['image'][0];
            imagePath = `${__dirname}/../public/services/${image.filename}`;
        }
        if (!image) return res.status(422).json({ message: 'Obraz jest wymagany' });

        if (!title) {
            deleteFile(imagePath);
            return res.status(422).json({ message: 'Tytuł jest wymagany' });
        }
        if (title.length > 50) {
            deleteFile(imagePath);
            return res.status(422).json({ message: 'Tytuł może mieć maksymalnie 50 znaków' });
        }
        if (!description) {
            deleteFile(imagePath);
            return res.status(422).json({ message: 'Opis jest wymagany' });
        }
        if (description.length > 255) {
            deleteFile(imagePath);
            return res.status(422).json({ message: 'Opis może mieć maksymalnie 255 znaków' });
        }
        if (!price) {
            deleteFile(imagePath);
            return res.status(422).json({ message: 'Cena jest wymagana' });
        }
        const prismaPrice = parseInt(price);
        if (isNaN(prismaPrice)) {
            deleteFile(imagePath);
            return res.status(422).json({ message: 'Cena musi być liczbą całkowitą' });
        }
        if (prismaPrice < 0) {
            deleteFile(imagePath);
            return res.status(422).json({ message: 'Cena musi być dodatnia' });
        }
        if (isFeatured === undefined || isFeatured === '') {
            deleteFile(imagePath);
            return res.status(422).json({ message: 'Wybierz czy usługa ma być polecana' });
        }

        try {
            const newService = await prisma.service.create({
                data: {
                    image: image.filename,
                    title,
                    description,
                    price
                }
            });
            if (isFeatured === 'true') {
                await prisma.featuredOffer.create({
                    data: {
                        serviceId: newService.id
                    }
                });
            }
            res.json(newService);
        } catch (err) {
            res.sendStatus(500);
        }
    })
});

serviceRoutes.put('/services/:id', jwtAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!await prisma.service.findUnique({ where: { id } })) return res.status(404).json({ message: 'Usługa nie istnieje' });
    serviceUpload(req, res, async err => {
        if (err) {
            if (err instanceof MulterError) {
                if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                    return res.status(422).json({ message: 'Plik musi być obrazem' });
                }
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(422).json({ message: 'Maksymalny rozmiar pliku to 3MB' });
                }
            }
            else {
                return res.sendStatus(500);
            }
        }
        const { title, description, price, isFeatured } = req.body;
        let image;
        let imagePath;
        if (req.files && typeof req.files === 'object' && 'image' in req.files) {
            image = req.files['image'][0];
            imagePath = `${__dirname}/../public/services/${image.filename}`;
        }
        if (!title) {
            deleteFile(imagePath);
            return res.status(422).json({ message: 'Tytuł jest wymagany' });
        }
        if (title.length > 50) {
            deleteFile(imagePath);
            return res.status(422).json({ message: 'Tytuł może mieć maksymalnie 50 znaków' });
        }
        if (!description) {
            deleteFile(imagePath);
            return res.status(422).json({ message: 'Opis jest wymagany' });
        }
        if (description.length > 255) {
            deleteFile(imagePath);
            return res.status(422).json({ message: 'Opis może mieć maksymalnie 255 znaków' });
        }
        if (!price) {
            deleteFile(imagePath);
            return res.status(422).json({ message: 'Cena jest wymagana' });
        }
        const prismaPrice = parseInt(price);
        if (isNaN(prismaPrice)) {
            deleteFile(imagePath);
            return res.status(422).json({ message: 'Cena musi być liczbą całkowitą' });
        }
        if (prismaPrice < 0) {
            deleteFile(imagePath);
            return res.status(422).json({ message: 'Cena musi być dodatnia' });
        }
        if (isFeatured === undefined || isFeatured === '') {
            deleteFile(imagePath);
            return res.status(422).json({ message: 'Wybierz czy usługa ma być polecana' });
        }

        try {
            await prisma.service.update({
                where: { id },
                data: {
                    image: image ? image.filename : undefined,
                    title,
                    description,
                    price
                }
            });
            if (isFeatured === 'true' && !await prisma.featuredOffer.findUnique({ where: { serviceId: id } })) {
                await prisma.featuredOffer.create({
                    data: {
                        serviceId: id
                    }
                });
            }
            else if (isFeatured === 'false' && await prisma.featuredOffer.findUnique({ where: { serviceId: id } })) {
                await prisma.featuredOffer.delete({ where: { serviceId: id } });
            }
            res.sendStatus(204);
        } catch (err) {
            res.sendStatus(500);
        }
    });
});

serviceRoutes.delete('/services/:id', jwtAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!await prisma.service.findUnique({ where: { id } })) return res.sendStatus(404);
    try {
        await prisma.service.delete({ where: { id } });
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
});

export default serviceRoutes;