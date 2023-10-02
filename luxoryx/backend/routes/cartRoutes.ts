import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import jwtAuthentication from '../middleware/jwtAuthentication';
const cartRoutes: Router = Router();
const prisma = new PrismaClient();


cartRoutes.post('/add-to-cart/:id', jwtAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    const quantity = req.body.quantity as string;
    const { user } = req.body;

    if (!quantity) return res.status(422).json({ message: 'Ilość jest wymagana' });
    if (isNaN(parseInt(quantity))) return res.status(422).json({ message: 'Ilość musi być liczbą całkowitą' });

    if (await prisma.cartElement.findFirst({ where: { user_id: user.id, product_id: id } })) return res.status(422).json({ message: 'Produkt jest już w koszyku' })
    try {
        await prisma.cartElement.create({
            data: {
                user_id: user.id,
                product_id: id,
                quantity: parseInt(quantity)
            }
        });
        res.status(201).json({ message: 'Dodano do koszyka' });
    } catch (err) {
        res.sendStatus(500);
    }
});

cartRoutes.get('/my-cart', jwtAuthentication, async (req: Request, res: Response) => {
    const { user } = req.body;
    const cartElements = await prisma.user.findUnique({
        where: {
            id: user.id
        },
        select: {
            cart_elements: {
                include: {
                    product: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            stock: true,
                            images: {
                                where: { is_thumbnail: { equals: true } }
                            }
                        }
                    }
                },
                orderBy: { added_at: 'desc' }
            }
        }
    });
    if (cartElements?.cart_elements.length === 0) return res.status(404).json({ message: 'Koszyk jest pusty' });

    res.json(cartElements?.cart_elements);
});

cartRoutes.get('/get-cart-product-overview/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!await prisma.product.findUnique({ where: { id } })) return res.status(404).json({ message: 'Nie znaleziono produktu' });

    const product = await prisma.product.findUnique({
        where: { id }, select: {
            id: true, name: true, price: true, stock: true, images: { where: { is_thumbnail: true } }
        }
    });
    res.json(product);
});

cartRoutes.post('/increase-quantity/:id', jwtAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req.body;
    const cartElement = await prisma.cartElement.findFirst({ where: { user_id: user.id, product_id: id }, include: { product: true } });
    if (!cartElement) return res.status(404).json({ message: 'Pozycja w koszyku nie istnieje' });
    if (cartElement.quantity + 1 > cartElement.product.stock) return res.status(400).json({ message: `Mamy tylko ${cartElement.product.stock} sztuk` });
    try {
        await prisma.cartElement.update({
            where: { id: cartElement.id },
            data: {
                quantity: cartElement.quantity + 1
            }
        });
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
});

cartRoutes.post('/decrease-quantity/:id', jwtAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req.body;
    const cartElement = await prisma.cartElement.findFirst({ where: { user_id: user.id, product_id: id }, include: { product: true } });
    if (!cartElement) return res.status(404).json({ message: 'Pozycja w koszyku nie istnieje' });
    if (cartElement.quantity - 1 === 0) return res.status(400).json({ message: 'Ilość nie może wynosić zero' });
    try {
        await prisma.cartElement.update({
            where: { id: cartElement.id },
            data: {
                quantity: cartElement.quantity - 1
            }
        });
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
});

cartRoutes.delete('/delete-cart-element/:id', jwtAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req.body;
    const cartElement = await prisma.cartElement.findFirst({ where: { user_id: user.id, product_id: id } });
    if (!cartElement) return res.status(400).json({ message: 'Pozycja w koszuku nie istnieje' });
    try {
        await prisma.cartElement.delete({
            where: {
                id: cartElement.id
            }
        });
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
});

export default cartRoutes;