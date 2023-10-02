import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';

const categoryRoutes: Router = Router();
const prisma = new PrismaClient();

categoryRoutes.get('/categories', async (req: Request, res: Response) => {
    const categories = await prisma.category.findMany();
    res.json(categories);
});

export default categoryRoutes;