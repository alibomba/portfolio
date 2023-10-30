import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

function jwtAuthentication(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');
    const accessToken = authHeader && authHeader.split(' ')[1];
    if (!accessToken) return res.status(401).json({ message: 'Nie znaleziono tokena' });
    jwt.verify(accessToken, process.env.JWT_SECRET as string, (err, user) => {
        if (err) return res.status(401).json({ message: err.message });
        req.body.user = user;
        next();
    });
}

export default jwtAuthentication;