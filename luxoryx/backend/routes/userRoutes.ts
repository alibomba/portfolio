import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwtAuthentication from '../middleware/jwtAuthentication';
import upload from '../middleware/pfpUpload';
import { MulterError } from 'multer';

const userRoutes: Router = Router();
const prisma = new PrismaClient();

userRoutes.post('/register', async (req: Request, res: Response) => {
    const { username, email, phoneNumber, password, passwordConfirmation } = req.body;
    if (!username) return res.status(422).json({ message: 'Nazwa użytkownika jest wymagana' });
    if (username.length > 25) return res.status(422).json({ message: 'Nazwa użytkownika może mieć maksymalnie 25 znaków' });
    if (!email) return res.status(422).json({ message: 'Adres e-mail jest wymagany' });
    const emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
    if (!emailRegex.test(email)) return res.status(422).json({ message: 'Podaj poprawny adres e-mail' });
    if (!phoneNumber) return res.status(422).json({ message: 'Numer telefonu jest wymagany' });
    if (phoneNumber.length > 25) return res.status(422).json({ message: 'Za długi numer telefonu' });
    if (!password) return res.status(422).json({ message: 'Hasło jest wymagane' });
    if (password.length < 8) return res.status(422).json({ message: 'Hasło musi mieć przynajmniej 8 znaków' });
    if (password.length > 60) return res.status(422).json({ message: 'Hasło może mieć maksymalnie 60 znaków' });
    if (password !== passwordConfirmation) return res.status(422).json({ message: 'Hasła nie są identyczne' });
    if (await prisma.user.findUnique({ where: { email } })) return res.status(422).json({ message: 'Podany adres e-mail jest już w użyciu' });
    const passwordHash = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: {
                username,
                email,
                phone_number: phoneNumber,
                password: passwordHash
            }
        });
        await prisma.shipping.create({
            data: {
                city: '',
                address: '',
                user_id: user.id
            }
        });
        res.status(201).json(user);
    } catch (err) {
        res.sendStatus(500);
    }
});



userRoutes.put('/update-user', jwtAuthentication, async (req: Request, res: Response) => {
    const { user } = req.body;
    upload(req, res, async err => {
        if (err) {
            if (err instanceof MulterError) {
                if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                    return res.status(422).json({ message: 'Plik musi być obrazem' });
                }
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(422).json({ message: 'Plik może mieć maksymalnie 2MB' });
                }
            }
            else {
                return res.sendStatus(500);
            }
        }
        if (req.file) {
            try {
                await prisma.user.update({ where: { id: user.id }, data: { profile_picture: req.file.filename } });
                return res.json({ path: req.file.filename });
            } catch (err) {
                return res.sendStatus(500);
            }
        }

        const { username, city, address, email, phoneNumber, password } = req.body;
        if (username || city || address || email || phoneNumber || password) {
            if (username) {
                if (username.length > 30) return res.status(422).json({ message: 'Nazwa użytkownika może mieć maksymalnie' });
                try {
                    await prisma.user.update({ where: { id: user.id }, data: { username } });
                    return res.json({ message: 'Zaktualizowano nazwę użytkownika' });
                } catch (err) {
                    return res.sendStatus(500);
                }
            }
            if (city) {
                if (city.length > 100) return res.status(422).json({ message: 'Miasto może mieć maksymalnie 100 znaków' });
                try {
                    await prisma.shipping.update({ where: { user_id: user.id }, data: { city } });
                    return res.json({ message: 'Zaktualizowano miasto dostawy' });
                } catch (err) {
                    return res.sendStatus(500);
                }
            }
            if (address) {
                if (address.length > 100) return res.status(422).json({ message: 'Adres może mieć maksymalnie 100 znaków' });
                try {
                    await prisma.shipping.update({ where: { user_id: user.id }, data: { address } });
                    return res.json({ message: 'Zaktualizowano adres dostawy' });
                } catch (err) {
                    return res.sendStatus(500);
                }
            }
            if (email) {
                if (email.length > 100) return res.status(422).json({ message: 'Adres e-mail może mieć maksymalnie 100 znaków' });
                const emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
                if (!emailRegex.test(email)) return res.status(422).json({ message: 'Podaj poprawny adres e-mail' });
                const userFound = await prisma.user.findUnique({ where: { email } });
                if (userFound && userFound.id !== user.id) return res.status(422).json({ message: 'Podany adres e-mail jest już zajęty' });
                try {
                    await prisma.user.update({ where: { id: user.id }, data: { email } });
                    return res.json({ message: 'Zaktualizowano adres e-mail' });
                } catch (err) {
                    return res.sendStatus(500);
                }
            }
            if (phoneNumber) {
                if (phoneNumber.length > 30) return res.status(422).json({ message: 'Numer telefonu może mieć maksymalnie 30 znaków' });
                try {
                    await prisma.user.update({ where: { id: user.id }, data: { phone_number: phoneNumber } });
                    return res.json({ message: 'Zaktualizowano numer telefonu' });
                } catch (err) {
                    return res.sendStatus(500);
                }
            }
            if (password) {
                if (password.length < 8) return res.status(422).json({ message: 'Hasło musi mieć przynajmniej 8 znaków' });
                if (password.length > 50) return res.status(422).json({ message: 'Hasło może mieć maksymalnie 50 znaków' });
                const passwordHash = await bcrypt.hash(password, 10);
                try {
                    await prisma.user.update({ where: { id: user.id }, data: { password: passwordHash } });
                    return res.json({ message: 'Zaktualizowano hasło' });
                } catch (err) {
                    return res.sendStatus(500);
                }
            }
        } else {
            res.status(400).json({ message: 'Brak danych do zaktualizowania' });
        }
    });
});

userRoutes.delete('/delete-pfp', jwtAuthentication, async (req: Request, res: Response) => {
    const { user } = req.body;
    try {
        await prisma.user.update({ where: { id: user.id }, data: { profile_picture: null } });
        res.json({ message: 'Usunięto zdjęcie profilowe' });
    } catch (err) {
        res.sendStatus(500);
    }
});

userRoutes.get('/settings', jwtAuthentication, async (req: Request, res: Response) => {
    const { user } = req.body;
    try {
        const settings = await prisma.user.findUnique({
            where: { id: user.id },
            select: {
                profile_picture: true,
                username: true,
                email: true,
                phone_number: true,
                shipping: {
                    select: {
                        city: true,
                        address: true
                    }
                }
            }
        });
        res.json(settings);
    } catch (err) {
        res.sendStatus(500);
    }
});


export default userRoutes;