import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
const {add, sub} = require('date-fns');
import formatDate from '../utilities/formatDate';
import jwtAuthentication from '../middleware/jwtAuthentication';

const reservationRoutes: Router = Router();
const prisma = new PrismaClient();

reservationRoutes.get('/nearest-date', async (req: Request, res: Response) => {
    const reservations = await prisma.reservation.findMany({
        where: {
            date: {
                gte: new Date()
            }
        },
        orderBy: {
            date: 'asc'
        },
        select: {
            date: true
        },
        take: 1
    });
    if (reservations.length === 0) {
        const tomorrow = add(new Date(), { days: 1 });
        const tomorrowString = formatDate(tomorrow);
        return res.json({
            date: tomorrowString,
            remaining: 1
        });
    }
    const nearestTakenDate = reservations[0].date;
    const nearestFreeDate = sub(nearestTakenDate, { days: 1 });
    const nearestFreeDateString = formatDate(nearestFreeDate);

    const now = new Date();
    const timeDifference = nearestFreeDate.getTime() - now.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    res.json({
        date: nearestFreeDateString,
        remaining: daysDifference
    });
});

reservationRoutes.get('/reservations', jwtAuthentication, async (req: Request, res: Response) => {
    const { howManyParam } = req.query;
    if (await prisma.reservation.count() === 0) return res.sendStatus(404);
    if (!howManyParam) return res.status(422).json({ message: 'Ilość jest wymagana' });
    const howMany = parseInt(howManyParam as string);
    if (isNaN(howMany)) return res.status(422).json({ message: 'Ilość musi być liczbą całkowitą' });
    const reservations = await prisma.reservation.findMany({ take: howMany, orderBy: { date: 'asc' } });
    const reservationCount = await prisma.reservation.count();
    res.json({
        isMore: howMany < reservationCount,
        reservations
    });
});

reservationRoutes.get('/reservations/:id', jwtAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    const reservation = await prisma.reservation.findUnique({ where: { id } });
    if (!reservation) return res.sendStatus(404);
    res.json(reservation);
});

reservationRoutes.delete('/reservations/:id', jwtAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!await prisma.reservation.findUnique({ where: { id } })) return res.status(404).json({ message: 'Rezerwacja nie istnieje' });
    try {
        await prisma.reservation.delete({ where: { id } });
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
});

reservationRoutes.post('/reservations', jwtAuthentication, async (req: Request, res: Response) => {
    const { service, price, date } = req.body;
    if (!service) return res.status(422).json({ message: 'Nazwa usługi jest wymagana' });
    if (service.length > 255) return res.status(422).json({ message: 'Nazwa usługi może mieć maksymalnie 255 znaków' });
    if (!price) return res.status(422).json({ message: 'Cena jest wymagana' });
    if (parseInt(price) < 0) return res.status(422).json({ message: 'Cena nie może być mniejsza niż 0' });
    const prismaPrice = parseInt(price);
    const prismaDate = new Date(date);
    if (!date) return res.status(422).json({ message: 'Data jest wymagana' });
    if (prismaDate < new Date()) return res.status(422).json({ message: 'Data nie może być w przeszłości' });
    try {
        const reservation = await prisma.reservation.create({
            data: {
                service,
                price: prismaPrice,
                date: prismaDate
            }
        });
        res.status(201).json(reservation);
    } catch (err) {
        res.sendStatus(500);
    }
});

reservationRoutes.put('/reservations/:id', jwtAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { service, price, date } = req.body;
    if (!await prisma.reservation.findUnique({ where: { id } })) return res.status(404).json({ message: 'Rezerwacja nie istnieje' });
    if (!service) return res.status(422).json({ message: 'Nazwa usługi jest wymagana' });
    if (service.length > 255) return res.status(422).json({ message: 'Nazwa usługi może mieć maksymalnie 255 znaków' });
    if (!price) return res.status(422).json({ message: 'Cena jest wymagana' });
    if (parseInt(price) < 0) return res.status(422).json({ message: 'Cena nie może być mniejsza niż 0' });
    const prismaPrice = parseInt(price);
    const prismaDate = new Date(date);
    if (!date) return res.status(422).json({ message: 'Data jest wymagana' });
    if (prismaDate < new Date()) return res.status(422).json({ message: 'Data nie może być w przeszłości' });
    try {
        await prisma.reservation.update({
            where: { id },
            data: {
                service,
                price: prismaPrice,
                date: prismaDate
            }
        });
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
});

export default reservationRoutes;