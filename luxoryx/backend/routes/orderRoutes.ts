import { Request, Response, Router } from 'express';
import { Order, PrismaClient } from '@prisma/client';
import jwtAuthentication from '../middleware/jwtAuthentication';
import { ClientProduct, PaginationResponse } from '../types';
import complementaryPercentage from '../utilities/complementaryPercentage';
import Stripe from 'stripe';
import optionalOrderJwt from '../middleware/optionalOrderJwt';
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string, { apiVersion: '2023-08-16' });
const orderRoutes: Router = Router();
const prisma = new PrismaClient();

const PER_PAGE: number = 6;

orderRoutes.get('/my-orders', jwtAuthentication, async (req: Request, res: Response) => {
    const { user } = req.body;
    let page = req.query.page as string | number;
    if (page) page = +page;
    else page = 1;
    const orderCount = (await prisma.order.findMany({ where: { user_id: user.id, paid: true } })).length;
    if (orderCount === 0) return res.status(404).json({ message: 'Brak zamówień' });
    const lastPage = Math.ceil(orderCount / PER_PAGE);
    if (page > lastPage) return res.status(404).json({ message: `There are only ${lastPage} pages` });
    const offset = (page - 1) * PER_PAGE;
    const orders = await prisma.order.findMany({ where: { user_id: user.id, paid: true }, include: { product: { select: { name: true, images: { where: { is_thumbnail: true } } } } }, take: PER_PAGE, skip: offset });
    const response: PaginationResponse<Order> = {
        currentPage: page,
        lastPage,
        data: orders
    };
    res.json(response);
});

orderRoutes.post('/report-order', jwtAuthentication, async (req: Request, res: Response) => {
    const { user, subject, content, orderId } = req.body;
    if (!orderId) return res.status(422).json({ message: 'Identyfikator zamówienia jest wymagany' });
    if (!await prisma.order.findUnique({ where: { id: orderId } })) return res.status(422).json({ message: 'Zamówienie nie istnieje' });
    if (!subject) return res.status(422).json({ message: 'Temat jest wymagany' });
    if (subject.length > 100) return res.status(422).json({ message: 'Temat może mieć maksymalnie 100 znaków' });
    if (!content) return res.status(422).json({ message: 'Treść jest wymagana' });
    if (content.length > 700) return res.status(422).json({ message: 'Treść może mieć maksymalnie 700 znaków' });

    try {
        await prisma.orderReport.create({
            data: {
                subject,
                content,
                order_id: orderId,
                user_id: user.id
            }
        });
        res.status(201).json({ message: 'Wysłano zgłoszenie' });
    } catch (err) {
        res.sendStatus(500);
    }
});

orderRoutes.get('/is-coupon-code-valid', async (req: Request, res: Response) => {
    const { code } = req.query;
    if (!code) return res.status(422).json({ message: 'Kod jest wymagany' });
    if (await prisma.discountCoupon.findUnique({ where: { code: code as string, is_valid: true } })) {
        res.json({ valid: true });
    }
    else {
        res.json({ valid: false });
    }
});

orderRoutes.post('/initiate-an-order', optionalOrderJwt, async (req: Request, res: Response) => {
    const { city, address, email, phoneNumber, shippingMethod, products, couponCode, user } = req.body;
    if (!city) return res.status(422).json({ message: 'Miasto jest wymagane' });
    if (!address) return res.status(422).json({ message: 'Adres jest wymagany' });
    if (!email) return res.status(422).json({ message: 'Adres e-mail jest wymagany' });
    const emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
    if (!emailRegex.test(email)) return res.status(422).json({ message: 'Podaj poprawny adres e-mail' });
    if (!phoneNumber) return res.status(422).json({ message: 'Numer telefonu jest wymagany' });
    if (!shippingMethod) return res.status(422).json({ message: 'Wyierz sposób dostawy' });
    let shippingPrice = 0;
    switch (shippingMethod) {
        case 'Paczkomat InPost':
            shippingPrice = 9.99;
            break;
        case 'Kurier DPD':
            shippingPrice = 19.99;
            break;
        case 'Kurier DHL':
            shippingPrice = 21.99;
            break;
        case 'Poczta Polska':
            shippingPrice = 15.99;
            break;
    }
    if (!products) return res.status(422).json({ message: 'Produkty są wymagane' });
    if (!Array.isArray(JSON.parse(products))) return res.status(422).json({ message: 'Nieprawidłowy format produktów' });
    if (couponCode) {
        var discountCoupon = await prisma.discountCoupon.findUnique({ where: { code: couponCode as string, is_valid: true } })
        if (!discountCoupon) return res.status(422).json({ message: 'Niepoprawny kod zniżkowy' });
    }
    const orderGroup = await prisma.orderGroup.create({
        data: {
            city,
            address,
            email,
            phone_number: phoneNumber,
            shippingMethod,
            status: 'Oczekiwanie na płatność'
        }
    });
    const productsArr: ClientProduct[] = JSON.parse(products);
    const line_items = await Promise.all(
        productsArr.map(async (product) => {
            const currentProduct = await prisma.product.findUnique({ where: { id: product.id }, include: { images: { where: { is_thumbnail: true } } } });
            if (!currentProduct) return {};
            await prisma.order.create({
                data: {
                    user_id: user ? user.id : undefined,
                    product_id: currentProduct.id,
                    sold_at_price: currentProduct.price,
                    quantity: product.quantity,
                    orderGroup_id: orderGroup.id
                }
            });
            return {
                price_data: {
                    currency: 'pln',
                    product_data: {
                        name: currentProduct.name,
                        images: [`${process.env.BACKEND_URL}/storage/offers/${currentProduct.images[0].url}`]
                    },
                    unit_amount: Math.round((couponCode && discountCoupon) ? complementaryPercentage(currentProduct.price * 100, discountCoupon.percentage) : currentProduct.price * 100)
                },
                quantity: product.quantity
            }
        }));
    line_items.push({
        price_data: {
            currency: 'pln',
            product_data: {
                name: shippingMethod,
                images: []
            },
            unit_amount: parseInt((shippingPrice * 100).toFixed(2))
        },
        quantity: 1
    });
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'paypal', 'blik', 'p24'],
            line_items,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/koszyk`,
            metadata: {
                orderGroupId: orderGroup.id
            }
        });
        return res.json({ url: session.url });
    } catch (err: any) {
        return res.json({ err });
    }
});

orderRoutes.post('/webhooks', async (req: Request, res: Response) => {
    const event = req.body;
    if (event.type === 'checkout.session.completed') {
        const orderGroupId = event.data.object.metadata.orderGroupId;
        const orderGroup = await prisma.orderGroup.findUnique({ where: { id: orderGroupId }, include: { orders: true } });
        if (!orderGroup) return res.sendStatus(400);
        await prisma.orderGroup.update({
            where: {
                id: orderGroupId
            },
            data: {
                status: 'Opłacono'
            }
        });
        orderGroup.orders.forEach(async (order) => {
            await prisma.order.update({
                where: {
                    id: order.id
                },
                data: {
                    paid: true
                }
            });
        });
    }
    res.json({ received: true });
});

orderRoutes.get('/shipping-data', jwtAuthentication, async (req: Request, res: Response) => {
    const { user } = req.body;

    const userWithShipping = await prisma.user.findUnique({ where: { id: user.id }, include: { shipping: true } });
    if (!userWithShipping) return res.status(404).json({ message: 'Użytkownik nie istnieje' });

    res.json({
        city: userWithShipping.shipping?.city || '',
        address: userWithShipping.shipping?.address || '',
        email: userWithShipping.email,
        phoneNumber: userWithShipping.phone_number
    });
});

export default orderRoutes;