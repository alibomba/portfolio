import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';

const adviceRoutes: Router = Router();
const prisma = new PrismaClient();

adviceRoutes.get('/advice', async (req: Request, res: Response) => {
    const advice = await prisma.advice.findMany();
    if (advice.length === 0) return res.status(404).json({ message: 'Nie znaleziono porad' });
    res.json(advice);
});

export default adviceRoutes;