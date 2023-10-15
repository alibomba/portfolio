import { PrismaClient } from '@prisma/client';
import { Request, Response, Router } from 'express';
import Stripe from 'stripe';

const fundRoutes: Router = Router();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string, { apiVersion: '2023-08-16' });

fundRoutes.get('/fund/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const fund = await prisma.fundraising.findUnique({ where: { id } });
    if (!fund) return res.status(404).json({ message: 'Nie znaleziono zbiórki' });
    res.json(fund);
});

fundRoutes.get('/funds', async (req: Request, res: Response) => {
    const funds = await prisma.fundraising.findMany();
    if (funds.length === 0) return res.status(404).json({ message: 'Brak zbiórek' });
    res.json(funds);
});

fundRoutes.post('/support/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { amountParam } = req.body;
    if (!amountParam) return res.status(422).json({ message: 'Kwota jest wymagana' });
    const amount = parseFloat(amountParam);
    if (isNaN(amount)) return res.status(422).json({ message: 'Kwota musi być liczbą' });
    if (amount < 2) return res.status(422).json({ message: 'Kwota nie może być mniejsza niż 2zł' });
    const fund = await prisma.fundraising.findUnique({ where: { id } });
    if (!fund) return res.status(404).json({ message: 'Zbiórka nie istnieje' });
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'paypal', 'blik', 'p24'],
            line_items: [
                {
                    price_data: {
                        currency: 'pln',
                        product_data: {
                            name: `Wsparcie zbiórki "${fund.title}"`
                        },
                        unit_amount: parseInt((amount * 100).toFixed(2))
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/wesprzyj?id=${id}`,
            cancel_url: `${process.env.FRONTEND_URL}/wesprzyj?id=${id}`,
            metadata: {
                id
            }
        });
        return res.json({ url: session.url });
    } catch (err) {
        return res.json({ err });
    }
});

fundRoutes.post('/webhooks', async (req: Request, res: Response) => {
    const event = req.body;
    if (event.type === 'checkout.session.completed') {
        const fundId = event.data.object.metadata.id;
        const amountPaid = event.data.object.amount_total / 100;
        const fund = await prisma.fundraising.findUnique({ where: { id: fundId } });
        if (!fund) return res.sendStatus(400);
        try {
            const newAmount = fund.currentAmount + amountPaid;
            await prisma.fundraising.update({
                where: {
                    id: fundId
                },
                data: {
                    currentAmount: newAmount
                }
            });
        } catch (err) {
            return res.sendStatus(500);
        }
    }
    res.json({ received: true });
});

export default fundRoutes;