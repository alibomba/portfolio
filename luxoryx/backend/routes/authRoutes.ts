import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { UserOptionalPassword } from '../types';
import jwtAuthentication from '../middleware/jwtAuthentication';

const authRoutes: Router = Router();
const prisma = new PrismaClient();

authRoutes.get('/auth', jwtAuthentication, (req: Request, res: Response) => {
    if (req.body.user) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(401);
    }
});

authRoutes.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(401).json({ message: 'Niepoprawny e-mail lub hasło' });
    const userFound = await prisma.user.findUnique({ where: { email } });
    if (!userFound) return res.status(401).json({ message: 'Niepoprawny e-mail lub hasło' });
    if (!await bcrypt.compare(password, userFound.password)) return res.status(401).json({ message: 'Niepoprawny e-mail lub hasło' });
    const user: UserOptionalPassword = { ...userFound };
    delete user.password;
    const accessToken = jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_TTL });
    const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET as string);
    try {
        await prisma.refreshToken.create({
            data: {
                token: refreshToken
            }
        });
        res.json({ accessToken, refreshToken });
    } catch (err) {
        res.sendStatus(500);
    }
});

authRoutes.post('/refresh', async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: 'Nie znaleziono tokena' });
    if (!await prisma.refreshToken.findUnique({ where: { token: refreshToken } })) return res.status(401).json({ message: 'Token nieprawidłowy' });
    jwt.verify(refreshToken as string, process.env.JWT_REFRESH_SECRET as string, (err, user: any) => {
        if (err) return res.status(401).json({ message: err.message });
        const userSecure: UserOptionalPassword = {
            id: user.id,
            username: user.username,
            profile_picture: user.profile_picture,
            email: user.email,
            phone_number: user.phone_number,
            created_at: user.created_at
        };
        const newToken = jwt.sign(userSecure, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_TTL });
        res.json({ accessToken: newToken });
    });
});

authRoutes.delete('/logout', jwtAuthentication, async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: 'Nie znaleziono tokena' });
    if (! await prisma.refreshToken.findUnique({ where: { token: refreshToken } })) return res.status(401).json({ message: 'Token nieprawidłowy' });
    jwt.verify(refreshToken as string, process.env.JWT_REFRESH_SECRET as string, async (err, user) => {
        if (err) return res.status(401).json({ message: err.message });
        await prisma.refreshToken.delete({ where: { token: refreshToken } });
        res.sendStatus(204);
    });
});

export default authRoutes;