import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';

const contactRoutes: Router = Router();
const prisma = new PrismaClient();

contactRoutes.post('/contact', async (req: Request, res: Response) => {
    const { fullName, email, phoneNumber, subject, content } = req.body;
    if (!fullName) return res.status(422).json({ message: 'Imię i nazwisko są wymagane' });
    if (fullName.length > 255) return res.status(422).json({ message: 'Imię i nazwisko mogą mieć maksymalnie 255 znaków' });
    if (!email) return res.status(422).json({ message: 'E-mail jest wymagany' });
    if (email.length > 55) return res.status(422).json({ message: 'E-mail może mieć maksymalnie 55 znaków' });
    const emailRegex = new RegExp(/^[\w\.-]+@[\w\.-]+\.\w+$/);
    if (!emailRegex.test(email)) return res.status(422).json({ message: 'Podaj poprawny adres e-mail' });
    if (!phoneNumber) return res.status(422).json({ message: 'Numer telefonu jest wymagany' });
    if (phoneNumber.length > 30) return res.status(422).json({ message: 'Numer telefonu może mieć maksymalnie 30 znaków' });
    if (!subject) return res.status(422).json({ message: 'Temat jest wymagany' });
    if (subject.length > 255) return res.status(422).json({ message: 'Temat może mieć maksymalnie 255 znaków' });
    if (!content) return res.status(422).json({ message: 'Treść wiadomości jest wymagana' });
    if (content.length > 700) return res.status(422).json({ message: 'Treść wiadomości może mieć maksymalnie 700 znaków' });

    try {
        await prisma.contactMessage.create({
            data: {
                fullName,
                email,
                phoneNumber,
                subject,
                content
            }
        });
        res.status(201).json({ message: 'Wiadomość została wysłana' });
    } catch (err) {
        res.sendStatus(500);
    }
});

export default contactRoutes;