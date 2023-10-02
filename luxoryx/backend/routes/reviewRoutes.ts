import { Request, Response, Router, response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwtAuthentication from '../middleware/jwtAuthentication';
import optionalOrderJwt from '../middleware/optionalOrderJwt';
const reviewRoutes: Router = Router();
const prisma = new PrismaClient();

reviewRoutes.get('/reviews/:id', optionalOrderJwt, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { sorting, howMany } = req.query;
    const { user } = req.body;
    let sortingQuery = 'new';
    let howManyQuery = 3;
    if (sorting && (sorting === 'new' || sorting === 'popular')) sortingQuery = sorting as string;
    if (howMany && !isNaN(parseInt(howMany as string))) howManyQuery = parseInt(howMany as string);
    if (!await prisma.product.findUnique({ where: { id } })) return res.status(404).json({ message: 'Produkt nie istnieje' });
    const reviews = await prisma.review.findMany({
        where: { product_id: id },
        orderBy: sortingQuery === 'new' ? {
            created_at: 'desc'
        } : {
            likes: 'desc'
        },
        take: howManyQuery,
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    profile_picture: true
                }
            }
        }
    });
    const responseReviews = await Promise.all(reviews.map(async (review) => {
        if (!user) return { ...review, isMine: false, isLiked: false, isDisliked: false };
        let isMine = false;
        let isLiked = false;
        let isDisliked = false;
        if (user.id === review.user.id) isMine = true;
        if (await prisma.reviewLike.findFirst({ where: { review_id: review.id, user_id: user.id } })) isLiked = true;
        if (await prisma.reviewDislike.findFirst({ where: { review_id: review.id, user_id: user.id } })) isDisliked = false;
        return { ...review, isMine, isLiked, isDisliked };
    }))
    const reviewsCount = (await prisma.review.findMany({ where: { product_id: id } })).length;
    res.json({ reviews: responseReviews, count: reviewsCount });
});

reviewRoutes.post('/review/:id', jwtAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content, rate, user } = req.body;
    if (!await prisma.product.findUnique({ where: { id } })) return res.status(422).json({ message: 'Produkt nie istnieje' });
    if (!content) return res.status(422).json({ message: 'Treść jest wymagana' });
    if (content.length > 300) return res.status(422).json({ message: 'Treść nie może mieć więcej niż 300 znaków' });
    if (!rate) return res.status(422).json({ message: 'Ocena jest wymagana' });
    if (isNaN(parseInt(rate))) return res.status(422).json({ message: 'Ocena musi być liczbą całkowitą' });
    try {
        const review = await prisma.review.create({
            data: {
                product_id: id,
                content,
                rate,
                user_id: user.id
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        profile_picture: true
                    }
                }
            }
        });
        res.status(201).json(review);
    } catch (err) {
        res.sendStatus(500);
    }
});

reviewRoutes.post('/toggle-review-like/:id', jwtAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req.body;
    const review = await prisma.review.findUnique({ where: { id } });
    if (!review) return res.status(404).json({ message: 'Recenzja nie istnieje' });
    if (await prisma.reviewLike.findFirst({ where: { user_id: user.id, review_id: id } })) {
        await prisma.reviewLike.deleteMany({ where: { user_id: user.id, review_id: id } });
        await prisma.review.update({
            where: { id },
            data: {
                likes: review.likes - 1
            }
        });
        res.status(200).json({ message: 'Usunięto ocenę' });
    }
    else {
        if (await prisma.reviewDislike.findFirst({ where: { user_id: user.id, review_id: id } })) {
            await prisma.reviewDislike.deleteMany({ where: { user_id: user.id, review_id: id } });
            await prisma.review.update({
                where: { id },
                data: {
                    dislikes: review.dislikes - 1
                }
            });
        }
        try {
            await prisma.reviewLike.create({
                data: {
                    user_id: user.id,
                    review_id: id
                }
            });
            await prisma.review.update({
                where: { id },
                data: {
                    likes: review.likes + 1
                }
            });
            res.status(201).json({ message: 'Dodano ocenę' });
        } catch (err) {
            res.sendStatus(500);
        }
    }
});

reviewRoutes.post('/toggle-review-dislike/:id', jwtAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req.body;
    const review = await prisma.review.findUnique({ where: { id } });
    if (!review) return res.status(404).json({ message: 'Recenzja nie istnieje' });
    if (await prisma.reviewDislike.findFirst({ where: { user_id: user.id, review_id: id } })) {
        await prisma.reviewDislike.deleteMany({ where: { user_id: user.id, review_id: id } });
        await prisma.review.update({
            where: { id },
            data: {
                dislikes: review.dislikes - 1
            }
        });
        res.status(200).json({ message: 'Usunięto ocenę' });
    }
    else {
        if (await prisma.reviewLike.findFirst({ where: { user_id: user.id, review_id: id } })) {
            await prisma.reviewLike.deleteMany({ where: { user_id: user.id, review_id: id } });
            await prisma.review.update({
                where: { id },
                data: {
                    likes: review.likes - 1
                }
            });
        }
        try {
            await prisma.reviewDislike.create({
                data: {
                    user_id: user.id,
                    review_id: id
                }
            });
            await prisma.review.update({
                where: { id },
                data: {
                    dislikes: review.dislikes + 1
                }
            });
            res.status(201).json({ message: 'Dodano ocenę' });
        } catch (err) {
            res.sendStatus(500);
        }
    }
});

reviewRoutes.post('/report-review/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!await prisma.review.findUnique({ where: { id } })) return res.status(404).json({ message: 'Recenzja nie istnieje' });
    try {
        await prisma.reviewReport.create({
            data: {
                review_id: id
            }
        });
        res.json({ message: 'Wysłano zgłoszenie' });
    } catch (err) {
        res.sendStatus(500);
    }
});

reviewRoutes.delete('/delete-review/:id', jwtAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req.body;
    const review = await prisma.review.findUnique({ where: { id } });
    if (!review) return res.status(404).json({ message: 'Recenzja nie istnieje' });
    if (review.user_id !== user.id) return res.status(403).json({ message: 'Nie można usunąć nie swojej recenzji' });
    try {
        await prisma.review.delete({ where: { id } });
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
});

export default reviewRoutes;