import { PrismaClient } from '@prisma/client';
import { Request, Response, Router } from 'express';

const newsletterRoutes: Router = Router();

const prisma = new PrismaClient();

newsletterRoutes.post('/newsletter', async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) return res.status(422).json({ message: 'E-mail jest wymagany' });
    if (email.length > 55) return res.status(422).json({ message: 'E-mail może mieć maksymalnie 55 znaków' });
    const emailRegex = new RegExp(/^[\w\.-]+@[\w\.-]+\.\w+$/);
    if (!emailRegex.test(email)) return res.status(422).json({ message: 'Podaj poprawny adres e-mail' });
    if (await prisma.newsletterMember.findUnique({ where: { email } })) return res.status(422).json({ message: 'E-mail jest już w bazie' });
    try {
        await prisma.newsletterMember.create({
            data: {
                email
            }
        });
        res.status(201).json({ message: 'E-mail został zapisany w bazie' });
    } catch (err) {
        res.sendStatus(500);
    }
});

export default newsletterRoutes;