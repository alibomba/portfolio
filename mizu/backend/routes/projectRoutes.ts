import { PrismaClient, Project } from '@prisma/client';
import { Request, Response, Router } from 'express';
import { PaginationResponse } from '../types/PaginationResponse';

const projectRoutes: Router = Router();

const prisma = new PrismaClient();

projectRoutes.get('/nearest-projects', async (req: Request, res: Response) => {
    const projectsCount = await prisma.project.count();
    const projects = await prisma.project.findMany({
        orderBy: {
            date: 'asc'
        },
        take: 4
    });
    if (projectsCount >= 4) {
        res.json(projects);
    } else {
        res.status(404).json({ message: 'Za mało projektów' });
    }
});

const PER_PAGE = 8;

projectRoutes.get('/projects', async (req: Request, res: Response) => {
    let page = req.query.page as string | number;
    if (page) page = +page;
    else page = 1;
    const projectCount = await prisma.project.count();
    const lastPage = Math.ceil(projectCount / PER_PAGE);
    if (page > lastPage) return res.status(404).json({ message: `Jest tylko ${lastPage} stron` });
    const offset = (page - 1) * PER_PAGE;
    const projects = await prisma.project.findMany({
        take: PER_PAGE,
        skip: offset
    });
    const response: PaginationResponse<Project> = {
        currentPage: page,
        lastPage,
        data: projects
    };
    res.json(response);
});

projectRoutes.get('/project/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return res.status(404).json({ message: 'Nie znaleziono projektu' });
    res.json(project);
});


export default projectRoutes;