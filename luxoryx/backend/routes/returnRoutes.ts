import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import jwtAuthentication from '../middleware/jwtAuthentication';
const returnRoutes: Router = Router();
const prisma = new PrismaClient();

returnRoutes.get('/return-data/:id', jwtAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req.body;
    const returnData = await prisma.order.findUnique({
        where: { id },
        include: {
            product: {
                select: {
                    name: true,
                    category: {
                        select: {
                            name: true
                        }
                    },
                    images: { where: { is_thumbnail: true } }
                }
            }
        }
    });
    if (!returnData) return res.status(404).json({ message: 'Zamówienie nie istnieje' });
    if (returnData.user_id !== user.id) return res.status(403).json({ message: 'Nie możesz zwrócić nie swojego zamówienia' });
    res.json(returnData);
});

returnRoutes.post('/submit-return/:id', jwtAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { reason, details, user } = req.body;
    if (!reason) return res.status(422).json({ message: 'Powód zwrotu jest wymagany' });
    if (details.length > 500) return res.status(422).json({ message: 'Szczegóły mogą mieć maksymalnie 500 znaków' });
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) return res.status(404).json({ message: 'Zamówienie nie istnieje' });
    if (order.user_id !== user.id) return res.status(403).json({ message: 'Nie możesz zwrócić nie swojego zamówienia' });
    if (await prisma.returnRequest.findUnique({ where: { order_id: id } })) return res.status(422).json({ message: 'To zamówienie jest już zwracane' });
    try {
        await prisma.returnRequest.create({
            data: {
                order_id: id,
                reason,
                details: details ? details : undefined
            }
        });
        res.status(201).json({ message: 'Wysłano prośbę o zwrot' });
    } catch (err) {
        res.sendStatus(500);
    }
});

export default returnRoutes;