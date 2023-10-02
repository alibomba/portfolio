import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
const contactRoutes: Router = Router();
const prisma = new PrismaClient();

contactRoutes.post('/contact', async (req: Request, res: Response) => {
    const { name, email, subject, content } = req.body;
    if (!name) return res.status(422).json({ message: 'Imię jest wymagane' });
    if (name.length > 100) return res.status(422).json({ message: 'Imię może mieć maksymalnie 100 znaków' });
    if (!email) return res.status(422).json({ message: 'Adres e-mail jest wymagany' });
    if (email.length > 100) return res.status(422).json({ message: 'Adres e-mail może mieć maksymalnie 100 znaków' });
    const emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
    if (!emailRegex.test(email)) return res.status(422).json({ message: 'Podaj poprawny adres e-mail' });
    if (!subject) return res.status(422).json({ message: 'Temat jest wymagany' });
    if (subject.length > 100) return res.status(422).json({ message: 'Temat może mieć maksymalnie 100 znaków' });
    if (!content) return res.status(422).json({ message: 'Treść wiadomości jest wymagana' });
    if (content.length > 1000) return res.status(422).json({ message: 'Treść wiadomości może mieć maksymalnie 1000 znaków' });

    try {
        await prisma.contactMessage.create({
            data: {
                name,
                email,
                subject,
                content
            }
        });
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }

});

export default contactRoutes;