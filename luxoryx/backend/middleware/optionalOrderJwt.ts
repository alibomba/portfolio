import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function optionalOrderJwt(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');
    const refreshToken = req.header('RefreshToken');
    const accessToken = authHeader && authHeader.split(' ')[1];
    if (!accessToken) return next();
    jwt.verify(accessToken, process.env.JWT_SECRET as string, async (err, user) => {
        if (err) {
            if (err.message === 'jwt expired'){
                if(!refreshToken) return next();
                if(!await prisma.refreshToken.findUnique({where: {token: refreshToken}})) return next();
                jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string, (err, user) => {
                    if(err) return next();
                    req.body.user = user;
                    next();
                });
            }
            else return next();
        }
        req.body.user = user;
        next();
    })
}

export default optionalOrderJwt;