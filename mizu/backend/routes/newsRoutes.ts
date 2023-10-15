import { News, PrismaClient } from '@prisma/client';
import { Request, Response, Router } from 'express';
import { PaginationResponse } from '../types/PaginationResponse';

const newsRoutes: Router = Router();
const prisma = new PrismaClient();

newsRoutes.get('/latest-news', async (req: Request, res: Response) => {
    const newsCount = await prisma.news.count();
    const news = await prisma.news.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        take: 2
    });
    if (newsCount >= 2) {
        res.json(news);
    }
    else {
        res.status(404).json({ message: 'Za mało aktualności' });
    }
});

const PER_PAGE = 8;

newsRoutes.get('/news', async (req: Request, res: Response) => {
    let page = req.query.page as string | number;
    if (page) page = +page;
    else page = 1;
    const newsCount = await prisma.news.count();
    const lastPage = Math.ceil(newsCount / PER_PAGE);
    if (page > lastPage) return res.status(404).json({ message: `Jest tylko ${lastPage} stron` });
    const offset = (page - 1) * PER_PAGE;
    const news = await prisma.news.findMany({
        take: PER_PAGE,
        skip: offset
    });
    const response: PaginationResponse<News> = {
        currentPage: page,
        lastPage,
        data: news
    };
    res.json(response);
});

newsRoutes.get('/news/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const news = await prisma.news.findUnique({ where: { id } });
    if (!news) return res.status(404).json({ message: 'Nie znaleziono aktualności' });
    res.json(news);
});

export default newsRoutes;