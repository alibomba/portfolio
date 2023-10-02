import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response, Router } from 'express';
import jwtAuthentication from "../middleware/jwtAuthentication";
const prisma = new PrismaClient();

const likeRoutes: Router = Router();

likeRoutes.post('/toggle-like/:id', jwtAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req.body;
    const like: Prisma.ProductLikeWhereInput = {
        product_id: id,
        user_id: user.id as string
    }


    if (await prisma.productLike.findFirst({ where: like })) {
        try {
            await prisma.productLike.deleteMany({ where: like });
            res.sendStatus(204);
        } catch (err) {
            res.sendStatus(500);
        }
    }
    else {
        try {
            await prisma.productLike.create({
                data: like as Prisma.ProductLikeCreateInput
            })
            res.sendStatus(201);
        } catch (err) {
            res.sendStatus(500);
        }
    }
});

likeRoutes.get('/is-liked/:id', jwtAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req.body;

    if (await prisma.productLike.findFirst({ where: { product_id: id, user_id: user.id as string } })) {
        res.json({ isLiked: true });
    }
    else {
        res.json({ isLiked: false });
    }
});


export default likeRoutes;