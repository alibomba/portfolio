import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';

const newsletterRoutes: Router = Router();
const prisma = new PrismaClient();

newsletterRoutes.post('/newsletter', async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) return res.status(422).json({ message: 'Email jest wymagany' });
    const emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
    if (!emailRegex.test(email)) return res.status(422).json({ message: 'Podaj poprawny adres e-mail' });
    if (await prisma.newsletterMember.findUnique({ where: { email } })) return res.status(422).json({ message: 'Podany adres e-mail jest już w bazie subskrybentów' });
    try {
        const newMember = await prisma.newsletterMember.create({
            data: {
                email
            }
        });
        res.status(201).json(newMember);
    } catch (err) {
        res.sendStatus(500);
    }
});

export default newsletterRoutes;