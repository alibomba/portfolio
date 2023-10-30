import { Request, Response, Router } from 'express';
import { PortfolioProject, PrismaClient } from '@prisma/client';
import PaginationResponse from '../types/PaginationResponse';
import Redis from 'ioredis';
import jwtAuthentication from '../middleware/jwtAuthentication';
import portfolioProjectUpload from '../middleware/portfolioProjectUpload';
import { MulterError } from 'multer';
import deleteFiles from '../utilities/deleteFiles';

const portfolioRoutes: Router = Router();
const prisma = new PrismaClient();
const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string),
    password: process.env.REDIS_PASSWORD
});

const PER_PAGE = 8;

portfolioRoutes.get('/portfolio', async (req: Request, res: Response) => {
    let page = req.query.page as string | number;
    if (page) page = +page;
    else page = 1;
    const projectCount = await prisma.portfolioProject.count();
    const lastPage = Math.ceil(projectCount / PER_PAGE);
    if (page > lastPage) return res.status(404).json({ message: `Jest tylko ${lastPage} stron` });
    const offset = (page - 1) * PER_PAGE;
    const projects = await prisma.portfolioProject.findMany({ take: PER_PAGE, skip: offset, include: { images: true }, orderBy: { date: 'desc' } });
    const response: PaginationResponse<PortfolioProject> = {
        currentPage: page,
        lastPage,
        data: projects
    };
    res.json(response);
});

portfolioRoutes.get('/projects', jwtAuthentication, async (req: Request, res: Response) => {
    const { howManyParam } = req.query;
    if (!howManyParam) return res.status(422).json({ message: 'Ilość jest wymagana' });
    const howMany = parseInt(howManyParam as string);
    if (isNaN(howMany)) return res.status(422).json({ message: 'Ilość musi być liczbą całkowitą' });
    if (howMany < 1) return res.status(422).json({ message: 'Ilość nie może być mniejsza od 1' });
    let isMore;
    if (await prisma.portfolioProject.count() <= howMany) isMore = false;
    else isMore = true;
    const projects = await prisma.portfolioProject.findMany({ take: howMany, include: { images: true } });
    res.json({
        isMore,
        projects
    });
});

portfolioRoutes.get('/project/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const cachedProject = await redis.get(`project.${id}`, (err, result) => {
        if (err) return res.json(err);
    });
    if (cachedProject) return res.json(JSON.parse(cachedProject));
    const project = await prisma.portfolioProject.findUnique({ where: { id }, include: { images: true } });
    if (!project) return res.status(404).json({ message: 'Projekt nie istnieje' });
    await redis.set(`project.${id}`, JSON.stringify(project));
    await redis.expire(`project.${id}`, 3600);
    res.json(project);
});

portfolioRoutes.post('/project', jwtAuthentication, async (req: Request, res: Response) => {
    portfolioProjectUpload(req, res, async err => {
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

        const { title, content, date } = req.body;

        let images: Express.Multer.File[] = [];
        let imagesPaths: string[] = [];
        if (req.files && typeof req.files === 'object' && 'images' in req.files) {
            images = req.files.images;
            images.forEach(image => {
                imagesPaths.push(`${__dirname}/../public/portfolio/${image.filename}`);
            })
        }
        if (images.length === 0) return res.status(422).json({ message: 'Obrazy są wymagane' });
        if (!title) {
            deleteFiles(imagesPaths);
            return res.status(422).json({ message: 'Tytuł jest wymagany' });
        }
        if (title.length > 25) {
            deleteFiles(imagesPaths);
            return res.status(422).json({ message: 'Tytuł może mieć maksymalnie 25 znaków' });
        }
        if (!content) {
            deleteFiles(imagesPaths);
            return res.status(422).json({ message: 'Treść jest wymagana' });
        }
        if (content.length > 1500) {
            deleteFiles(imagesPaths);
            return res.status(422).json({ message: 'Treść może mieć maksymalnie 1500 znaków' });
        }
        if (!date) {
            deleteFiles(imagesPaths);
            return res.status(422).json({ message: 'Data jest wymagana' });
        }

        try {
            const newProject = await prisma.portfolioProject.create({
                data: {
                    title,
                    content,
                    date: new Date(date)
                }
            });
            await Promise.all([images.forEach(async (image) => {
                await prisma.portfolioProjectImage.create({
                    data: {
                        portfolioProjectId: newProject.id,
                        url: image.filename
                    }
                });
            })]);
            res.json(await prisma.portfolioProject.findUnique({ where: { id: newProject.id }, include: { images: true } }));
        } catch (err) {
            res.sendStatus(500);
        }
    })
});

portfolioRoutes.put('/project/:id', jwtAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!await prisma.portfolioProject.findUnique({ where: { id } })) return res.status(404).json({ message: 'Projekt nie istnieje' });

    portfolioProjectUpload(req, res, async err => {
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

        const { title, content, date } = req.body;

        let images: Express.Multer.File[] = [];
        let imagesPaths: string[] = [];
        if (req.files && typeof req.files === 'object' && 'images' in req.files) {
            images = req.files.images;
            images.forEach(image => {
                imagesPaths.push(`${__dirname}/../public/portfolio/${image.filename}`);
            })
        }

        if (!title) {
            deleteFiles(imagesPaths);
            return res.status(422).json({ message: 'Tytuł jest wymagany' });
        }
        if (title.length > 25) {
            deleteFiles(imagesPaths);
            return res.status(422).json({ message: 'Tytuł może mieć maksymalnie 25 znaków' });
        }
        if (!content) {
            deleteFiles(imagesPaths);
            return res.status(422).json({ message: 'Treść jest wymagana' });
        }
        if (content.length > 1500) {
            deleteFiles(imagesPaths);
            return res.status(422).json({ message: 'Treść może mieć maksymalnie 1500 znaków' });
        }
        if (!date) {
            deleteFiles(imagesPaths);
            return res.status(422).json({ message: 'Data jest wymagana' });
        }

        try {
            await prisma.portfolioProject.update({
                where: { id },
                data: {
                    title,
                    content,
                    date: new Date(date)
                }
            });
            if (images.length > 0) {
                await prisma.portfolioProjectImage.deleteMany({ where: { portfolioProjectId: id } });
                await Promise.all([images.forEach(async (image) => {
                    await prisma.portfolioProjectImage.create({
                        data: {
                            portfolioProjectId: id,
                            url: image.filename
                        }
                    });
                })]);
            }
            const cachedProject = await redis.get(`project.${id}`, (err, result) => {
                if (err) return res.json(err);
            });
            if (cachedProject) {
                await redis.del(`project.${id}`);
            }
            res.sendStatus(204);
        } catch (err) {
            res.sendStatus(500);
        }
    });
});

portfolioRoutes.delete('/project/:id', jwtAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!await prisma.portfolioProject.findUnique({ where: { id } })) return res.status(404).json({ message: 'Projekt nie istnieje' });
    try {
        await prisma.portfolioProject.delete({ where: { id } });
        const cachedProject = await redis.get(`project.${id}`, (err, result) => {
            if (err) return res.json(err);
        });
        if (cachedProject) {
            await redis.del(`project.${id}`);
        }
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
});

export default portfolioRoutes;